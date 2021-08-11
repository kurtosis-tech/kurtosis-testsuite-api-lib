import { TestSuiteMetadata } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
//"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite" TODO TODO TODO
//"google.golang.org/protobuf/types/known/emptypb" TODO - potentially remove (maybe make this the any time)
import { ok, err, Result } from "neverthrow";

// Service handlign endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
class MetadataProvidingTestsuiteService {
	//kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer //TODO 

	private readonly suite: testsuite.TestSuite

	constructor(suite: testsuite.TestSuite) {
		this.suite = testsuite.TestSuite;
	}

	public isAvailable(empty: any): Result<any, Error> { //TODO - should I be changing empty to any type
		return ok(empty); //TODO what about the error checking
	}

public getTestSuiteMetadata(empty: any): Result<TestSuiteMetadata, Error> {
	const allTestMetadata: Map<string, TestSuiteMetadata> = new Map();
	for testName, test := range service.suite.GetTests() {
		testConfigBuilder := testsuite.NewTestConfigurationBuilder()
		test.Configure(testConfigBuilder)
		testConfig := testConfigBuilder.Build()
		testMetadata := &kurtosis_testsuite_rpc_api_bindings.TestMetadata{
			IsPartitioningEnabled: testConfig.IsPartitioningEnabled,
			TestSetupTimeoutInSeconds: testConfig.SetupTimeoutSeconds,
			TestRunTimeoutInSeconds: testConfig.RunTimeoutSeconds,
		}
		allTestMetadata[testName] = testMetadata
	}

	testSuiteMetadata := &kurtosis_testsuite_rpc_api_bindings.TestSuiteMetadata{
		TestMetadata:     allTestMetadata,
	}

	return testSuiteMetadata, nil
}

func (service MetadataProvidingTestsuiteService) RegisterFiles(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RegisterFilesArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

func (service MetadataProvidingTestsuiteService) SetupTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.SetupTestArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

func (service MetadataProvidingTestsuiteService) RunTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RunTestArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

