export enum KurtosisTestsuiteDockerEnvVar {
    // TODO Rename this envvar, since the testsuite can accept whatever it wants - doesn't have to be JSON
    CustomParamsJson = "CUSTOM_PARAMS_JSON",
    DebuggerPort = "DEBUGGER_PORT",
    KurtosisApiSocket = "KURTOSIS_API_SOCKET", // Only populated if in test-running mode
    LogLevel = "LOG_LEVEL"
}

/*
The dirpath on the testsuite container where the enclave data volume will be mounted
This is hardcoded because there's no real reason for it to be parameterized.
*/
export const ENCLAVE_DATA_VOLUME_MOUNTPOINT: string = "/kurtosis-enclave-data";