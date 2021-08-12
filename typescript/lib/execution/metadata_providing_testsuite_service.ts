import { TestMetadata, TestSuiteMetadata, RegisterFilesArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestConfigurationBuilder } from "../testsuite";
import { TestConfiguration } from "../testsuite";
import { TestSuite } from "../testsuite";
//"google.golang.org/protobuf/types/known/emptypb" TODO - potentially remove (maybe make this the any time)
import { ok, err, Result } from "neverthrow";

// Service handlign endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
class MetadataProvidingTestsuiteService {
	//kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer //TODO 

	private readonly suite: TestSuite

	constructor(suite: TestSuite) {
		this.suite = TestSuite;
	}

	public isAvailable(empty: any): Result<any, Error> { //TODO - should I be changing empty to any type
		return ok(empty); //TODO what about the error checking
	}

	public getTestSuiteMetadata(empty: any): Result<TestSuiteMetadata, Error> {
		const allTestMetadata: Map<string, TestSuiteMetadata> = new Map();
		for ([testName, test] of this.suite.GetTests().entries()) {
			const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
			test.Configure(testConfigBuilder);
			const testConfig: TestConfiguration = testConfigBuilder.Build()
			const testMetadata: TestMetadata = new TestMetadata(); //TODO TODO TODO - move to constructor calls
			testMetadata.setIsPartitioningEnabled(testConfig.IsPartitioningEnabled);
			testMetadata.setTestSetupTimeoutInSeconds(testConfig.SetupTimeoutSeconds);
			testMetadata.setTestRunTimeoutInSeconds(testConfig.RunTimeoutSeconds);
	
			allTestMetadata[testName] = testMetadata;
		}

		const testSuiteMetadata = new TestSuiteMetadata();
		const testSuiteMetadataMap: Map<string, TestSuiteMetadata> = testSuiteMetadata.getTestMetadataMap();
		for (let allTestMetadataId in allTestMetadata) {
			testSuiteMetadataMap.set(allTestMetadataId, allTestMetadata[allTestMetadataId]);
		}
		return ok(testSuiteMetadata); //TODO - what about error case?
	}

	public registerFiles(args: RegisterFilesArgs): Result<any, Error> { //TODO, get rid of parameters, can make this only error
		return err(new Error("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public setupTest(args: SetupTestArgs): Result<any, Error> {
		return err(new Error("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public runTest(args: RunTestArgs): Result< any, Error> {
		return err(new Error("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}
}