import { ITestSuiteServiceService, ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb"; //TODO (Ali) - Finalize which one to use here
import { RegisterFilesArgs, SetupTestArgs, RunTestArgs, TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { Test } from "../testsuite/test";
import { TestSuite } from "../testsuite/test_suite";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder";
import { TestConfiguration } from "../testsuite/test_configuration";
import { Network, NetworkContext } from "kurtosis-core-api-lib";
import { ResultAsync, okAsync, errAsync, Result, ok, err } from "neverthrow"; //TODO (Ali) - might not be the right call to use this here
import * as log from "loglevel";
import * as mutex from "async-mutex";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb"; //TODO (Ali)
import * as grpc from "grpc"; //TODO (Ali)

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
export class TestExecutingTestsuiteService implements ITestSuiteServiceServer{ //TODO - right interface?
	
    readonly [name: string]: any; //TODO TODO TODO (Ali) Solves the compiling issues but BIG maybe here
    
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

    public isAvailable(): Result<null, Error> { //TODO (Ali) fix method signature - public isAvailable(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void 

        return ok(null); //TODO (Ali) - what about error checking
    }

    public getTestSuiteMetadata(): Result<TestSuiteMetadata, Error> { //TODO (Ali) fix method signature - public getTestSuiteMetadata(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<TestSuiteMetadata>): void
        return err(new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis")); //TODO (Ali) - what about ok value?
    }

    public async registerFiles(): Promise<Result<RegisterFilesArgs, Error>> { //TODO (Ali) method signature - public registerFiles(call: grpc.ServerUnaryCall<RegisterFilesArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void
        const args: RegisterFilesArgs = new RegisterFilesArgs(); //TODO REMOVE (Ali) - Temporary ; NOT RIGHT ; NEED TO REMOVE
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.getTests();
        if (!allTests.has(testName)) { //TODO (Ali)- making assumption that if key existing in Map, then value should be there too ; I think this should be alright
            return err(new Error("No test '" + testName + "' found in the testsuite"));
        }
        const test: Test = allTests[testName];

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
        test.configure(testConfigBuilder);
        const testConfig: TestConfiguration = testConfigBuilder.build();

        const registerStaticFilesResponse: Result<null, Error> = await this.networkCtx.registerStaticFiles(testConfig.getStaticFileFilepaths());
        if (!registerStaticFilesResponse.isOk()) {
            return err(registerStaticFilesResponse.error);
        }

        const registerFilesArtifactsResponse: Result<null, Error> = await this.networkCtx.registerFilesArtifacts(testConfig.getFilesArtifactUrls());
        if (!registerFilesArtifactsResponse.isOk()) {
            return err(registerFilesArtifactsResponse.error);
        }

        return ok(null);
    }

    public async setupTest(): Promise<Result<SetupTestArgs, Error>> { //TODO (Ali) method signature - public setupTest(call: grpc.ServerUnaryCall<SetupTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void 
        const args: SetupTestArgs = new SetupTestArgs(); //TODO REMOVE (Ali) - Temporary ; NOT RIGHT ; NEED TO REMOVE
        const release = await this.postSetupNetworkMutex.acquire();
        try {
            if (this.postSetupNetwork != null) {
                return err(new Error("Cannot setup test; a test was already set up"));
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.getTests();
            if (!allTests.has(testName)) { //TODO (Ali)
                return err(new Error("Testsuite was directed to setup test '" + testName + "', but no test with that name exists " +
                "in the testsuite; this is a Kurtosis code bug"));
            }
            const test: Test = allTests[testName];

            log.info("Setting up network for test '" + testName + "'...");
            const userNetworkResult: Result<Network, Error> = test.setup(this.networkCtx);
            
            if (!userNetworkResult.isOk()) {
                return err(userNetworkResult.error);
            }
            if (userNetworkResult.value == null) {
                return err(new Error("The test setup method returned successfully, but yielded a nil network object - this is a bug with the test's setup method accidentally returning a nil network object"));
            }
            this.postSetupNetwork = userNetworkResult.value;
            log.info("Successfully set up test network for test '" + testName + "'");

            return ok(null);
        } finally {
            release();
        }
    }

    public async runTest(): Promise<Result<RunTestArgs, Error>> { //TODO (Ali) method signature - public runTest(call: grpc.ServerUnaryCall<RunTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void
        const args: RunTestArgs = new RunTestArgs(); //TODO REMOVE (Ali) - Temporary ; NOT RIGHT ; NEED TO REMOVE
        const release = await this.postSetupNetworkMutex.acquire();
        try {

            if (this.postSetupNetwork == null) {
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
            const runTestHelperResult: Result<null,Error> = this.runTestHelper(test, this.postSetupNetwork);
            if (!runTestHelperResult.isOk()) {
                return err(runTestHelperResult.error);
            }
            log.info("Ran test logic for test " + testName);
            return ok(null);
        } finally {
            release();
        }
    }

    // Little helper function that runs the test and captures panics on test failures, returning them as errors
    public runTestHelper(test: Test, untypedNetwork: any): Result<null, Error> { //TODO - return type
        // See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
        try {
            const runErr: Error = test.run(untypedNetwork);
            if (runErr != null) {
                return err(runErr);
            }
            log.trace("Test completed successfully");
            return null;
        } catch(panicErr) { //TODO (Ali) (comment) - handling exception is like running recover() to handle panic
                //TODO (Ali) (comment) - got rid of defer function since the defer function will not run after function execution like go
                log.trace("Caught panic while running test: " + panicErr);
        }
    }
}