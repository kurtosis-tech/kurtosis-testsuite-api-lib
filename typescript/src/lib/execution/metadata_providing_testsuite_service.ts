import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { TestMetadata, TestSuiteMetadata, RegisterFilesArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder"; //TODO
import { TestConfiguration } from "../testsuite/test_configuration"; //TODO
import { TestSuite } from "../testsuite/test_suite"; //TODO
import { newTestMetadata } from "../constructor_calls";
import { ok, err, Result } from "neverthrow";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";

// Service handlign endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
export class MetadataProvidingTestsuiteService implements ITestSuiteServiceServer { //TODO - right server to implement?
	private readonly suite: TestSuite;

	constructor(suite: TestSuite) {
		this.suite = TestSuite;
	}

	//TODO type signature of this method in grpc bindings => isAvailable: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
	public isAvailable(): Result<grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>, Error> { //TODO - should I be using Result; how do I go about writing this method signature?
		return ok(null);
	}

	public getTestSuiteMetadata(): Result<TestSuiteMetadata, Error> { //TODO - fix method signature
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

	public registerFiles(args: RegisterFilesArgs): Result<null, Error> { //TODO - fix method signature
		return err(new Error("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public setupTest(args: SetupTestArgs): Result<null, Error> { //TODO - fix method signature
		return err(new Error("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}

	public runTest(args: RunTestArgs): Result<null, Error> { //TODO - fix method signature
		return err(new Error("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"));
	}
}