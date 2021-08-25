import { TestMetadata, TestSuiteMetadata } from "../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import * as jspb from "google-protobuf";

export function newTestMetadata(isPartitioningEnabled: boolean, setupTimeoutSeconds: number, runTimeoutSeconds: number): TestMetadata {
    const result: TestMetadata = new TestMetadata();
    result.setIsPartitioningEnabled(isPartitioningEnabled);
    result.setTestSetupTimeoutInSeconds(setupTimeoutSeconds);
    result.setTestRunTimeoutInSeconds(runTimeoutSeconds);

    return result;
}

export function newTestSuiteMetadata(allTestMetadata: Map<string, TestMetadata>): TestSuiteMetadata {
    const result: TestSuiteMetadata = new TestSuiteMetadata();
    const resultMap: jspb.Map<string, TestMetadata> = result.getTestMetadataMap();
    for (let [allTestMetadataId, allTestMetadataTestSuite] of allTestMetadata.entries()) {
        resultMap.set(allTestMetadataId, allTestMetadataTestSuite);
    }
    
    return result;
}