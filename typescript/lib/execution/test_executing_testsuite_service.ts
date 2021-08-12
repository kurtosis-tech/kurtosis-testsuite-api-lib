//	"github.com/kurtosis-tech/kurtosis-client/golang/lib/networks"
import { UnimplementedTestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
//	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite"
import { TestSuite } from ""
import * as log from "loglevel";
// "google.golang.org/protobuf/types/known/emptypb" - TODO potentiall remove
//	"sync"

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
class TestExecutingTestsuiteService {
	// This embedding is required by gRPC
	// private readonly kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer //TODO - figure this out

	private readonly suite: TestSuite

	// Will be nil until setup is called
	private readonly postSetupNetwork: networks.Network

	// Mutex to guard the postSetupNetwork object, so any accidental concurrent calls of SetupInfo don't generate race conditions
	private readonly postSetupNetworkMutex: sync.Mutex //TODO
    new Mutex 

	//private readonly networkCtx *networks.NetworkContext //TODO - remove

    constructor(suite: TestSuite, networkCtx: networks.NetworkContext): TestExecutingTestsuiteService {
        this.suite = suite;
        this.postSetupNetwork = null;
        this.postSetupNetworkMutex = sync.Mutex;
    }

    public isAvailable(_ context.Context, _ *emptypb.Empty) (*emptypb.Empty, error) {
        return &emptypb.Empty{}, nil
    }

    func (service TestExecutingTestsuiteService) GetTestSuiteMetadata(ctx context.Context, empty *emptypb.Empty) (*kurtosis_testsuite_rpc_api_bindings.TestSuiteMetadata, error) {
        return nil, stacktrace.NewError("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis")
    }

    func (service TestExecutingTestsuiteService) RegisterFiles(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RegisterFilesArgs) (*emptypb.Empty, error) {
        testName := args.TestName
        allTests := service.suite.GetTests()
        test, found := allTests[testName]
        if !found {
            return nil, stacktrace.NewError("No test '%v' found in the testsuite", testName)
        }

        testConfigBuilder := testsuite.NewTestConfigurationBuilder()
        test.Configure(testConfigBuilder)
        testConfig := testConfigBuilder.Build()

        if err := service.networkCtx.RegisterStaticFiles(testConfig.StaticFileFilepaths); err != nil {
            return nil, stacktrace.Propagate(err, "An error occurred registering the testsuite's static files")
        }
        if err := service.networkCtx.RegisterFilesArtifacts(testConfig.FilesArtifactUrls); err != nil {
            return nil, stacktrace.Propagate(err, "An error occurred registering the testsuite's files artifact URLs")
        }
        return &emptypb.Empty{}, nil
    }

    func (service *TestExecutingTestsuiteService) SetupTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.SetupTestArgs) (*emptypb.Empty, error) {
        service.postSetupNetworkMutex.Lock()
        defer service.postSetupNetworkMutex.Unlock()

        if service.postSetupNetwork != nil {
            return nil, stacktrace.NewError("Cannot setup test; a test was already set up")
        }

        testName := args.TestName

        allTests := service.suite.GetTests()
        test, found := allTests[testName]
        if !found {
            return nil, stacktrace.NewError(
                "Testsuite was directed to setup test '%v', but no test with that name exists " +
                    "in the testsuite; this is a Kurtosis code bug",
                testName,
            )
        }

        logrus.Infof("Setting up network for test '%v'...", testName)
        userNetwork, err := test.Setup(service.networkCtx)
        if err != nil {
            return nil, stacktrace.Propagate(err, "An error occurred during test setup")
        }
        if userNetwork == nil {
            return nil, stacktrace.NewError("The test setup method returned successfully, but yielded a nil network object - this is a bug with the test's setup method accidentally returning a nil network object")
        }
        service.postSetupNetwork = userNetwork
        logrus.Infof("Successfully set up test network for test '%v'", testName)

        return &emptypb.Empty{}, nil
    }

    func (service TestExecutingTestsuiteService) RunTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RunTestArgs) (*emptypb.Empty, error) {
        service.postSetupNetworkMutex.Lock()
        defer service.postSetupNetworkMutex.Unlock()

        if service.postSetupNetwork == nil {
            return nil, stacktrace.NewError("Received a request to run the test, but the test hasn't been set up yet")
        }

        testName := args.TestName

        allTests := service.suite.GetTests()
        test, found := allTests[testName]
        if !found {
            return nil, stacktrace.NewError(
                "Testsuite was directed to run test '%v', but no test with that name exists " +
                    "in the testsuite; this is a Kurtosis code bug",
                testName,
            )
        }

        logrus.Infof("Running test logic for test '%v'...", testName)
        if err := runTest(test, service.postSetupNetwork); err != nil {
            return nil, stacktrace.Propagate(
                err,
                "An error occurred running test '%v'",
                testName,
            )
        }
        logrus.Infof("Ran test logic for test '%v'", testName)
        return &emptypb.Empty{}, nil
    }

    // Little helper function that runs the test and captures panics on test failures, returning them as errors
    func runTest(test testsuite.Test, untypedNetwork interface{}) (resultErr error) {
        // See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
        defer func() {
            if recoverResult := recover(); recoverResult != nil {
                logrus.Tracef("Caught panic while running test: %v", recoverResult)
                resultErr = recoverResult.(error)
            }
        }()
        if err := test.Run(untypedNetwork); err != nil {
            return stacktrace.Propagate(err, "The test returned an error")
        }
        logrus.Tracef("Test completed successfully")
        return
    }
}