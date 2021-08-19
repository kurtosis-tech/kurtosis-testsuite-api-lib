import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { RegisterFilesArgs, SetupTestArgs, RunTestArgs, TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { Test } from "../testsuite/test"; //TODO
import { TestSuite } from "../testsuite/test_suite"; //TODO
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder"; //TODO
import { TestConfiguration } from "../testsuite/test_configuration"; //TODO
import { Network, NetworkContext } from "kurtosis-js-lib"; //TODO
import { Result, ok, err } from "neverthrow"; //TODO - might not be the right call to use this here
import * as log from "loglevel";
import * as mutex from "async-mutex";

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
export class TestExecutingTestsuiteService implements ITestSuiteServiceServer{ //TODO - right interface?
	
    //TODO - Remove
    // // This embedding is required by gRPC
	// private readonly kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer 

	private readonly suite: TestSuite;

	// Will be nil until setup is called
	private postSetupNetwork: Network;

	// Mutex to guard the postSetupNetwork object, so any accidental concurrent calls of SetupInfo don't generate race conditions
	private readonly postSetupNetworkMutex: mutex.Mutex;

	private readonly networkCtx: NetworkContext;

    constructor(suite: TestSuite, networkCtx: NetworkContext): TestExecutingTestsuiteService {
        this.suite = suite;
        this.postSetupNetwork = null;
        this.postSetupNetworkMutex = new mutex.Mutex();
        this.networkCtx = networkCtx;
    }

    public isAvailable(_: null): Result<null, Error> { //TODO - why is there an underscore instead of a parameter name like empty?
        return ok(null); //TODO - what about error checking
    }

    public getTestSuiteMetadata(empty: null): Result<TestSuiteMetadata, Error> { //TODO - unused parameter
        return err(new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis")); //what about ok value?
    }

    public async registerFiles(args: RegisterFilesArgs): Promise<Result<null, Error>> { //TODO
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.getTests();
        if (!allTests.has(testName)) { //TODO - making assumption that if key existing in Map, then value should be there too ; I think this should be alright
            return err(new Error("No test '" + testName + "' found in the testsuite"));
        }
        const test: Test = allTests[testName];

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
        test.configure(testConfigBuilder);
        const testConfig: TestConfiguration = testConfigBuilder.build();

        const registerStaticFilesResponse: Result<null, Error> = await this.networkCtx.registerStaticFiles(testConfig.staticFileFilepaths);
        if (!registerStaticFilesResponse.isOk()) {
            return err(registerStaticFilesResponse.error);
        }

        const registerFilesArtifactsResponse: Result<null, Error> = await this.networkCtx.registerFilesArtifacts(testConfig.filesArtifactUrls);
        if (!registerFilesArtifactsResponse.isOk()) {
            return err(registerFilesArtifactsResponse.error);
        }

        return ok(null);
    }

    public setupTest(args: SetupTestArgs): Result<null, Error> { //TODO
        const release = await this.postSetupNetworkMutex.acquire();
        try {
            if (this.postSetupNetwork != null) {
                return err(new Error("Cannot setup test; a test was already set up"));
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.getTests();
            if (!allTests.has(testName)) { //TODO
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

            return ok(null); //TODO
        } finally {
            release();
        }
    }

    public runTest(args: RunTestArgs): Result<null, Error> { //TODO
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
            const runTestHelperErr: Error = this.runTestHelper(test, this.postSetupNetwork);
            if (runTestHelperErr != null) {
                return err(runTestHelperErr);
            }
            log.info("Ran test logic for test " + testName);
            return ok(null); //TODO
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
            return null; //TODO TODO TODO - right call?
        } finally {
            () => { //TODO - would this call the function or are we just defining the function and I would need to invoke it
                const recoverResult = recover(); //TODO - is there a way to recover (handle panic) in javascrpt? + type assertion
                if (recoverResult != null) {
                    log.trace("Caught panic while running test: " + recoverResult)
                    const resultErr: Error = recoverResult.(error); //TODO - what is the purpose of resultErr
                }
            }
        }
    }
}