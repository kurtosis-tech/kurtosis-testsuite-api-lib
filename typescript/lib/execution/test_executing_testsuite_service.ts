import { networks } from "...."; //TODO
import { RegisterFilesArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
//	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite"
import { TestSuite, TestSuiteMetadata, Test } from "../testsuite";
import { TestConfigurationBuilder } from "../testsuite";
import { TestConfiguration } from "../testsuite";
import { Result, ok, err, Err } from "neverthrow"; //TODO - might not be the right call to use this here
import * as log from "loglevel";
import * as mutex from "async-mutex";

// "google.golang.org/protobuf/types/known/emptypb" - TODO potentiall remove

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
class TestExecutingTestsuiteService { //TODO - implement an interface
	// This embedding is required by gRPC
	// private readonly kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer //TODO - figure this out

	private readonly suite: TestSuite;

	// Will be nil until setup is called
	private postSetupNetwork: networks.Network;

	// Mutex to guard the postSetupNetwork object, so any accidental concurrent calls of SetupInfo don't generate race conditions
	private readonly postSetupNetworkMutex: mutex.Mutex;

	private readonly networkCtx: networks.NetworkContext;

    constructor(suite: TestSuite, networkCtx: networks.NetworkContext): TestExecutingTestsuiteService {
        this.suite = suite;
        this.postSetupNetwork = null;
        this.postSetupNetworkMutex = new mutex.Mutex();
        this.networkCtx = networkCtx;
    }

    public isAvailable(empty: any): Result<any, Error> { //TODO - why is there an underscore instead of a parameter name?
        return ok(empty); //TODO - what about error checking
    }

    public getTestSuiteMetadata(): Result<TestSuiteMetadata, Error> { //TODO - should I be keeping this: empty *emptypb.Empty
        return err(new Error("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis")); //what about ok value?
    }

    public async registerFiles(args: RegisterFilesArgs): Promise<Result<any, Error>> { //TODO - *emptypb.Empty, replace with null?
        const testName: string = args.getTestName();
        const allTests: Map<string, Test> = this.suite.GetTests();
        if (!allTests.has(testName)) { //TODO - making assumption that if key existing in Map, then value should be there too
            return err(new Error("No test '%v' found in the testsuite", testName));
        }
        const test: Test = allTests[testName];

        const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder()
        test.Configure(testConfigBuilder)
        const testConfig: TestConfiguration = testConfigBuilder.Build();

        const registerStaticFilesResponse: Result<null, Error> = await this.networkCtx.RegisterStaticFiles(testConfig.StaticFileFilepaths);
        if (!registerStaticFilesResponse.isOk()) {
            return err(registerStaticFilesResponse.error);
        }

        const registerFilesArtifactsResponse: Result<null, Error> = await this.networkCtx.RegisterFilesArtifacts(testConfig.FilesArtifactUrls);
        if (!registerFilesArtifactsResponse.isOk()) {
            return err(registerFilesArtifactsResponse.error);
        }

        return ok(null);
    }

    public setupTest(args: SetupTestArgs): Result<any, Error> { //TODO - should I be keeping this: empty *emptypb.Empty
        const release = await this.postSetupNetworkMutex.acquire();
        try {
            if (this.postSetupNetwork != null) {
                return err(new Error("Cannot setup test; a test was already set up"));
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.GetTests();
            if (!allTests.has(testName)) {//TODO
                return err(new Error("Testsuite was directed to setup test '" + testName + "', but no test with that name exists " +
                "in the testsuite; this is a Kurtosis code bug"));
            }
            const test: Test = allTests[testName];

            log.info("Setting up network for test '" + testName + "'...");
            const userNetworkResult: Result<networks.Network, Error> = test.Setup(this.networkCtx);
            
            if (!userNetworkResult.isOk()) {
                return err(userNetworkResult.error);
            }
            if (userNetworkResult.value == null) {
                return err(new Error("The test setup method returned successfully, but yielded a nil network object - this is a bug with the test's setup method accidentally returning a nil network object"));
            }
            this.postSetupNetwork = userNetworkResult.value;
            log.info("Successfully set up test network for test '" + testName + "'")

            return ok(null); //TODO
        } finally {
            release();
        }
    }

    public runTest(args: RunTestArgs): Result<any, Error> {
        const release = await this.postSetupNetworkMutex.acquire();
        try {

            if (this.postSetupNetwork == null) {
                return err(new Error("Received a request to run the test, but the test hasn't been set up yet"));
            }

            const testName: string = args.getTestName();

            const allTests: Map<string, Test> = this.suite.GetTests();
            if (!allTests.has(testName)) {
                return err(new Error("Testsuite was directed to run test '" + testName + "', but no test with that name exists " +
                "in the testsuite; this is a Kurtosis code bug"));
            }
            const test: Test = allTests[testName];
  
            log.info("Running test logic for test '" + testName + "'...")
            const runTestHelperErr: Error = runTestHelper(test, this.postSetupNetwork);
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
    public runTestHelper(test: Test, untypedNetwork: any): Result<resultErr, Error> {
        // See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
        try {
            const runErr: Error = test.Run(untypedNetwork);
            if (runErr != null) {
                return err(runErr);
            }
            log.trace("Test completed successfully");
            return //TODO TODO TODO
        } finally {
            () => {
                const recoverResult = recover(); //TODO - is there a way to recover (handle panic) in javascrpt? + type assertion
                if (recoverResult != null) {
                    log.trace("Caught panic while running test: " + recoverResult)
                    const resultErr: Error = recoverResult.(error);
                }
            }
        }
    }
}