import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { TestMetadata, TestSuiteMetadata, RegisterFilesArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder"; //TODO
import { TestConfiguration } from "../testsuite/test_configuration"; //TODO
import { TestSuite } from "../testsuite/test_suite"; //TODO
import { newTestMetadata } from "../constructor_calls";
import { ok, err, Result } from "neverthrow";

// Service handlign endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
export class MetadataProvidingTestsuiteService implements ITestSuiteServiceServer{ //TODO - right server to implement?
	private readonly suite: TestSuite;

	constructor(suite: TestSuite) {
		this.suite = TestSuite;
	}

	public isAvailable(empty: null): Result<null, Error> { //TODO - should empty be null or google_protobuf_empty_pb.Empty as indicated in typescript bindings
		return ok(empty);
	}

	public getTestSuiteMetadata(empty: null): Result<TestSuiteMetadata, Error> {
		const allTestMetadata: Map<string, TestSuiteMetadata> = new Map();
		for (let [testName, test] of this.suite.getTests().entries()) {
			const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
			test.configure(testConfigBuilder);
			const testConfig: TestConfiguration = testConfigBuilder.build();
			const testMetadata: TestMetadata = newTestMetadata(
				testConfig.isPartitioningEnabled, 
				testConfig.setupTimeoutSeconds, 
				testConfig.runTimeoutSeconds);
	
			allTestMetadata[testName] = testMetadata;
		}

		const testSuiteMetadata: TestSuiteMetadata = new TestSuiteMetadata();
		const testSuiteMetadataMap: Map<string, TestSuiteMetadata> = testSuiteMetadata.getTestMetadataMap();
		for (let [allTestMetadataId, allTestMetadataTestSuite] of allTestMetadata.entries()) {
			testSuiteMetadataMap.set(allTestMetadataId, allTestMetadataTestSuite);
		}
		return ok(testSuiteMetadata); //TODO - can there never be an error case?
	}

	public registerFiles(args: RegisterFilesArgs): Result<null, Error> { //TODO - parameter is unused
		return err(new Error("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public setupTest(args: SetupTestArgs): Result<null, Error> { //TODO
		return err(new Error("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public runTest(args: RunTestArgs): Result<null, Error> { //TODO
		return err(new Error("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}
}