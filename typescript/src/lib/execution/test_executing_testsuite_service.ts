import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { RegisterFilesArgs, SetupTestArgs, RunTestArgs, TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { Test } from "../testsuite/test";
import { TestSuite } from "../testsuite/test_suite";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder";
import { TestConfiguration } from "../testsuite/test_configuration";
import { Network, NetworkContext } from "kurtosis-core-api-lib";
import * as log from "loglevel";
import * as mutex from "async-mutex";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";
import { KnownKeysOnly } from "minimal-grpc-server";
import { KurtosisTestsuiteApiLibServiceError } from "./serviceError"; //TODO - Following DRY and I think this repo specific at the moment so I can't import from anywhere
import { Result, ok, err } from "neverthrow";

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
export class TestExecutingTestsuiteService implements KnownKeysOnly<ITestSuiteServiceServer>{
	    
    private readonly suite: TestSuite;
    
    // Will be nil until setup is called
    private postSetupNetwork: Network;
    
    // Mutex to guard the postSetupNetwork object, so any accidental concurrent calls of SetupInfo don't generate race conditions
    private readonly postSetupNetworkMutex: mutex.Mutex;
    
    private readonly networkCtx: NetworkContext;
    
    constructor(suite: TestSuite, networkCtx: NetworkContext) {
        this.suite = suite;
        this.postSetupNetwork = null;
        this.postSetupNetworkMutex = new mutex.Mutex();
        this.networkCtx = networkCtx;
    }

    public isAvailable(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        callback(null, null);
    }

    public getTestSuiteMetadata(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<TestSuiteMetadata>): void {
        const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
			grpc.status.INTERNAL, 
			new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; " + "this is a bug in Kurtosis")
		);
		callback(serviceError, null);
    }

    public registerFiles(call: grpc.ServerUnaryCall<RegisterFilesArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        const args: RegisterFilesArgs = call.request;
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.getTests();
        if (!allTests.has(testName)) { //Note - making assumption that if key existing in Map, then value should be there too
			const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
				grpc.status.INTERNAL,
				new Error("No test '" + testName + "' found in the testsuite")
			);
			callback(serviceError, null);
        }
        const test: Test = allTests[testName];

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
        test.configure(testConfigBuilder);
        const testConfig: TestConfiguration = testConfigBuilder.build();

        this.networkCtx.registerStaticFiles(testConfig.getStaticFileFilepaths()).then(registerStaticFilesResponse => { //TODO - format
			if (!registerStaticFilesResponse.isOk()) {
				const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
					grpc.status.INTERNAL,
					registerStaticFilesResponse.error
				);
				callback(serviceError, null);
				return;
			}

			this.networkCtx.registerFilesArtifacts(testConfig.getFilesArtifactUrls()).then(registerFilesArtifactsResponse => { //TODO - format
				if (!registerFilesArtifactsResponse.isOk()) {
					const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
						grpc.status.INTERNAL,
						registerFilesArtifactsResponse.error
					);
					callback(serviceError, null);
					return;
				}

				callback(null, null);

			})
		})

    }

    public setupTest(call: grpc.ServerUnaryCall<SetupTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        const args: SetupTestArgs = call.request;
		const functionInsideMutex: () => Promise<Result<null, Error>> = () => {
			return this.setupTestAsync(args);
		}

        this.postSetupNetworkMutex.runExclusive(functionInsideMutex).then(setupTestResult => {
			if (!setupTestResult.isOk()) {
				const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
					grpc.status.INTERNAL,
					setupTestResult.error
				);
				callback(serviceError, null);
			} else {
				callback(null, null);
			}

		})
    }

    public runTest(call: grpc.ServerUnaryCall<RunTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        const args: RunTestArgs = call.request;
		const functionInsideMutex: () => Promise<Result<null, Error>> = () => {
			return this.runTestAsync(args);
		}
        this.postSetupNetworkMutex.runExclusive(functionInsideMutex).then(runTestResult => {
			if (!runTestResult.isOk()) {
				const serviceError: KurtosisTestsuiteApiLibServiceError = new KurtosisTestsuiteApiLibServiceError(
					grpc.status.INTERNAL,
					runTestResult.error
				)
				callback(serviceError, null);
			} else {
				callback(null, null);
			}
		})
    }


	//HELPER METHODS

    // Little helper function that runs the test and captures panics on test failures, returning them as errors
    public runTestHelper(test: Test, untypedNetwork: any): Promise<Error> {
        // See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
        try {
            const resultErr: Promise<Error> = test.run(untypedNetwork).then(runErr => {
				if (runErr !== null) {
					return runErr;
				}
				log.trace("Test completed successfully");
				return null;
			})
			return resultErr;
        } catch(exceptionErr) {
                log.trace("Caught panic while running test: " + exceptionErr);
        }
    }

	public async setupTestAsync(args: SetupTestArgs): Promise<Result<null, Error>> {
		if (this.postSetupNetwork !== null) {
			return err(new Error("Cannot setup test; a test was already set up"));
		}

		const testName: string = args.getTestName();

		const allTests: Map<string, Test> = this.suite.getTests();
		if (!allTests.has(testName)) { //Note - making assumption that if key existing in Map, then value should be there too
			return err(new Error("Testsuite was directed to setup test '" + testName + "', but no test with that name exists " +
			"in the testsuite; this is a Kurtosis code bug"));
		}
		const test: Test = allTests[testName];

		log.info("Setting up network for test '" + testName + "'...");
		
		const userNetworkResult: Result<Network, Error> = await test.setup(this.networkCtx);
		if (!userNetworkResult.isOk()) {
			return err(userNetworkResult.error);
		} 
		if (userNetworkResult.value === null) {
			return err(new Error("The test setup method returned successfully, but yielded a nil network object - " +
			"this is a bug with the test's setup method accidentally returning a nil network object"));
		}
		this.postSetupNetwork = userNetworkResult.value;
		log.info("Successfully set up test network for test '" + testName + "'");

		ok(null);
	}

	public async runTestAsync(args: RunTestArgs): Promise<Result<null, Error>> {

		if (this.postSetupNetwork === null) {
			return err(new Error("Received a request to run the test, but the test hasn't been set up yet"));
		}

		const testName: string = args.getTestName();

		const allTests: Map<string, Test> = this.suite.getTests();
		if (!allTests.has(testName)) {
			return err(new Error("Testsuite was directed to run test '" + testName + "', but no test with that name exists " +
			"in the testsuite; this is a Kurtosis code bug"));
		}
		const test: Test = allTests[testName];

		log.info("Running test logic for test '" + testName + "'...");
		this.runTestHelper(test,this.postSetupNetwork).then(runTestHelperErr => {
			if (runTestHelperErr !== null) {
				return err(runTestHelperErr);
			}
			log.info("Ran test logic for test " + testName);
			return ok(null);
		})
	}
}