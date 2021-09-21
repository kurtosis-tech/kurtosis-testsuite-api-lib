import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { RegisterFilesArtifactsArgs, SetupTestArgs, RunTestArgs, TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
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
import { Result, ok, err } from "neverthrow";

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
export class TestExecutingTestsuiteService implements KnownKeysOnly<ITestSuiteServiceServer>{
        
    private readonly suite: TestSuite;
    
    // Will be nil until setup is called
    private postSetupNetwork: Network | null;
    
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
        callback(null, new google_protobuf_empty_pb.Empty());
    }

    public getTestSuiteMetadata(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<TestSuiteMetadata>): void {
        callback(new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; " + "this is a bug in Kurtosis"), null);
    }

    public registerFilesArtifacts(call: grpc.ServerUnaryCall<RegisterFilesArtifactsArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        const args: RegisterFilesArtifactsArgs = call.request;
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.getTests();
        if (!allTests.has(testName)) { //Note - making assumption that if key existing in Map, then value should be there too
            callback(new Error("No test '" + testName + "' found in the testsuite"), null);
        }
        const test: Test = allTests.get(testName)!;

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
        test.configure(testConfigBuilder);
        const testConfig: TestConfiguration = testConfigBuilder.build();

        this.networkCtx.registerFilesArtifacts(testConfig.getFilesArtifactUrls()).then(registerFilesArtifactsResponse => {
            if (!registerFilesArtifactsResponse.isOk()) {
                callback(registerFilesArtifactsResponse.error, null);
                return;
            }

            callback(null, new google_protobuf_empty_pb.Empty());
        })

    }

    public setupTest(call: grpc.ServerUnaryCall<SetupTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        const args: SetupTestArgs = call.request;
        const functionInsideMutex: () => Promise<Result<null, Error>> = () => {
            return this.setupTestAsync(args);
        }

        this.postSetupNetworkMutex.runExclusive(functionInsideMutex).then(setupTestResult => {
            if (!setupTestResult.isOk()) {
                callback(setupTestResult.error, null);
            } else {
                callback(null, new google_protobuf_empty_pb.Empty());
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
                callback(runTestResult.error, null);
            } else {
                callback(null, new google_protobuf_empty_pb.Empty());
            }
        })
    }


    //HELPER METHODS

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
        const test: Test = allTests.get(testName)!;

        log.info("Setting up network for test '" + testName + "'...");
        
        const userNetworkResult: Result<Network, Error> = await test.setup(this.networkCtx);
        if (!userNetworkResult.isOk()) {
            return err(userNetworkResult.error);
        } 
        if (userNetworkResult.value === undefined) {
            return err(new Error("The test setup method returned successfully, but yielded an undefined network object - " +
            "this is a bug with the test's setup method accidentally returning an undefined network object"));
        }
        if (userNetworkResult.value === null) {
            return err(new Error("The test setup method returned successfully, but yielded a null network object - " +
            "this is a bug with the test's setup method accidentally returning a null network object"));
        }
        this.postSetupNetwork = userNetworkResult.value;
        log.info("Successfully set up test network for test '" + testName + "'");

        return ok(null);
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
        const test: Test = allTests.get(testName)!;

        log.info("Running test logic for test '" + testName + "'...");

        let runTestResult: Result<null, Error>;
        try {
            runTestResult = await test.run(this.postSetupNetwork);
        } catch(exception) {
            return err(exception);
        }

        if (!runTestResult.isOk()) {
            return err(runTestResult.error);
        }
        log.info("Ran test logic for test " + testName);
        return ok(null);
    }

}