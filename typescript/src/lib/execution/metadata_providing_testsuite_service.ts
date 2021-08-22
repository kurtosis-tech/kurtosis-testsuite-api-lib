import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb"; //TODO (Ali) - make sure right interface
import { TestMetadata, TestSuiteMetadata, RegisterFilesArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder";
import { TestConfiguration } from "../testsuite/test_configuration";
import { TestSuite } from "../testsuite/test_suite";
import { newTestMetadata } from "../constructor_calls";
import { ok, err, Result } from "neverthrow";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb"; //TODO (Ali)
import * as grpc from "grpc"; //TODO (Ali)

// Service handling endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
export class MetadataProvidingTestsuiteService implements ITestSuiteServiceServer { //TODO (Ali) - methods on this interface are odd
	private readonly suite: TestSuite;
	
	readonly [name: string]: any; //TODO TODO TODO (Ali) Solves the compiling issues but BIG maybe here

	constructor(suite: TestSuite) {
		this.suite = suite;
	}

	public isAvailable(): Result<null, Error> { //TODO (Ali)
		return ok(null);
	}

	public getTestSuiteMetadata(): Result<TestSuiteMetadata, Error> { //TODO (Ali)
		const allTestMetadata: Map<string, TestSuiteMetadata> = new Map();
		for (let [testName, test] of this.suite.getTests().entries()) {
			const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
			test.configure(testConfigBuilder);
			const testConfig: TestConfiguration = testConfigBuilder.build();
			const testMetadata: TestMetadata = newTestMetadata(
				testConfig.getIsPartitioningEnabled(), 
				testConfig.getSetupTimeoutSeconds(), 
				testConfig.getRunTimeoutSeconds());
	
			allTestMetadata[testName] = testMetadata;
		}

		const testSuiteMetadata: TestSuiteMetadata = new TestSuiteMetadata();
		const testSuiteMetadataMap: Map<string, TestSuiteMetadata> = testSuiteMetadata.getTestMetadataMap();
		for (let [allTestMetadataId, allTestMetadataTestSuite] of allTestMetadata.entries()) {
			testSuiteMetadataMap.set(allTestMetadataId, allTestMetadataTestSuite);
		}
		return ok(testSuiteMetadata); //TODO - can there never be an error case?
	}

	public registerFiles(): Result<RegisterFilesArgs, Error> { //TODO (Ali)
		return err(new Error("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public setupTest(): Result<SetupTestArgs, Error> { //TODO (Ali)
		return err(new Error("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public runTest(): Result<RunTestArgs, Error> { //TODO (Ali)
		return err(new Error("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}
}