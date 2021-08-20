import { TestMetadata } from "../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";

export function newTestMetadata(isPartitioningEnabled: boolean, setupTimeoutSeconds: number, runTimeoutSeconds: number): TestMetadata {
    const result: TestMetadata = new TestMetadata();
    result.setIsPartitioningEnabled(isPartitioningEnabled);
    result.setTestSetupTimeoutInSeconds(setupTimeoutSeconds);
    result.setTestRunTimeoutInSeconds(runTimeoutSeconds);

    return result;
}