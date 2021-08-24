import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { RegisterFilesArgs, SetupTestArgs, RunTestArgs, TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { Test } from "../testsuite/test";
import { TestSuite } from "../testsuite/test_suite";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder";
import { TestConfiguration } from "../testsuite/test_configuration";
import { Network, NetworkContext } from "kurtosis-core-api-lib";
import { Result, ok, err } from "neverthrow";
import * as log from "loglevel";
import * as mutex from "async-mutex";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";
import { KnownKeysOnly } from "./unimplemented_server_requirements";


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
        callback(new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis"), null);
    }

    public async registerFiles(call: grpc.ServerUnaryCall<RegisterFilesArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): Promise<void> {
        const args: RegisterFilesArgs = call.request;
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.getTests();
        if (!allTests.has(testName)) { //Note - making assumption that if key existing in Map, then value should be there too
            callback(new Error("No test '" + testName + "' found in the testsuite"), null);
            return;
        }
        const test: Test = allTests[testName];

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
        test.configure(testConfigBuilder);
        const testConfig: TestConfiguration = testConfigBuilder.build();

        const registerStaticFilesResponse: Result<null, Error> = await this.networkCtx.registerStaticFiles(testConfig.getStaticFileFilepaths());
        if (!registerStaticFilesResponse.isOk()) {
            callback(registerStaticFilesResponse.error, null);
            return;
        }

        const registerFilesArtifactsResponse: Result<null, Error> = await this.networkCtx.registerFilesArtifacts(testConfig.getFilesArtifactUrls());
        if (!registerFilesArtifactsResponse.isOk()) {
            callback(registerFilesArtifactsResponse.error, null);
            return;
        }

        callback(null, null);
    }

    public async setupTest(call: grpc.ServerUnaryCall<SetupTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): Promise<void> {
        const args: SetupTestArgs = call.request;
        const release = await this.postSetupNetworkMutex.acquire();
        try {
            if (this.postSetupNetwork !== null) {
                callback(new Error("Cannot setup test; a test was already set up"), null);
                return;
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.getTests();
            if (!allTests.has(testName)) { //Note - making assumption that if key existing in Map, then value should be there too
                callback(new Error("Testsuite was directed to setup test '" + testName + "', but no test with that name exists " +
                "in the testsuite; this is a Kurtosis code bug"), null);
                return;
            }
            const test: Test = allTests[testName];

            log.info("Setting up network for test '" + testName + "'...");
            const userNetworkResult: Result<Network, Error> = test.setup(this.networkCtx);
            
            if (!userNetworkResult.isOk()) {
                callback(userNetworkResult.error, null);
                return;
            } 
            if (userNetworkResult.value === null) {
                callback(new Error("The test setup method returned successfully, but yielded a nil network object - this is a bug with the test's setup method accidentally returning a nil network object"), null);
            }
            this.postSetupNetwork = userNetworkResult.value;
            log.info("Successfully set up test network for test '" + testName + "'");

            callback(null, null);
        } finally {
            release();
        }
    }

    public async runTest(call: grpc.ServerUnaryCall<RunTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): Promise<void> {
        const args: RunTestArgs = call.request;
        const release = await this.postSetupNetworkMutex.acquire();
        try {

            if (this.postSetupNetwork === null) {
                callback(new Error("Received a request to run the test, but the test hasn't been set up yet"), null);
                return;
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.getTests();
            if (!allTests.has(testName)) {
                callback(new Error("Testsuite was directed to run test '" + testName + "', but no test with that name exists " +
                "in the testsuite; this is a Kurtosis code bug"), null);
                return;
            }
            const test: Test = allTests[testName];
  
            log.info("Running test logic for test '" + testName + "'...");
            const runTestHelperResult: Result<null,Error> = this.runTestHelper(test, this.postSetupNetwork);
            if (!runTestHelperResult.isOk()) {
                callback(runTestHelperResult.error, null);
                return;
            }
            log.info("Ran test logic for test " + testName);
            callback(null, null);
        } finally {
            release();
        }
    }

    // Little helper function that runs the test and captures panics on test failures, returning them as errors
    public runTestHelper(test: Test, untypedNetwork: any): Result<null, Error> {
        // See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
        try {
            const runErr: Error = test.run(untypedNetwork);
            if (runErr !== null) {
                return err(runErr);
            }
            log.trace("Test completed successfully");
            return ok(null);
        } catch(panicErr) {
                log.trace("Caught panic while running test: " + panicErr);
        }
    }
}