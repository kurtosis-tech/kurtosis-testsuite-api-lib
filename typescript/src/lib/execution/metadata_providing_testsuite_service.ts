import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { TestMetadata, TestSuiteMetadata, RegisterFilesArtifactsArgs, SetupTestArgs, RunTestArgs } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestConfigurationBuilder } from "../testsuite/test_configuration_builder";
import { TestConfiguration } from "../testsuite/test_configuration";
import { TestSuite } from "../testsuite/test_suite";
import { newTestMetadata, newTestSuiteMetadata } from "../constructor_calls";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";
import { KnownKeysOnly } from "minimal-grpc-server";

// Service handling endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
export class MetadataProvidingTestsuiteService implements KnownKeysOnly<ITestSuiteServiceServer> {
    private readonly suite: TestSuite;

    constructor(suite: TestSuite) {
        this.suite = suite;
    }

    public isAvailable(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        callback(null, new google_protobuf_empty_pb.Empty());
    }

    public getTestSuiteMetadata(call: grpc.ServerUnaryCall<google_protobuf_empty_pb.Empty>, callback: grpc.sendUnaryData<TestSuiteMetadata>): void {
        const allTestMetadata: Map<string, TestMetadata> = new Map();
        for (const [testName, test] of this.suite.getTests().entries()) {
            const testConfigBuilder: TestConfigurationBuilder = new TestConfigurationBuilder();
            test.configure(testConfigBuilder);
            const testConfig: TestConfiguration = testConfigBuilder.build();
            const testMetadata: TestMetadata = newTestMetadata(
                testConfig.getIsPartitioningEnabled(), 
                testConfig.getSetupTimeoutSeconds(), 
                testConfig.getRunTimeoutSeconds());
    
            allTestMetadata.set(testName, testMetadata);
        }

        const testSuiteMetadata: TestSuiteMetadata = newTestSuiteMetadata(allTestMetadata);
        return callback(null, testSuiteMetadata);
    }

    public registerFilesArtifacts(call: grpc.ServerUnaryCall<RegisterFilesArtifactsArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        callback(new Error("Received a register files artifacts call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"), null);
    }

    public setupTest(call: grpc.ServerUnaryCall<SetupTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void {
        callback(new Error("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"), null);
    }

    public runTest(call: grpc.ServerUnaryCall<RunTestArgs>, callback: grpc.sendUnaryData<google_protobuf_empty_pb.Empty>): void{
        callback(new Error("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis"), null);
    }
}