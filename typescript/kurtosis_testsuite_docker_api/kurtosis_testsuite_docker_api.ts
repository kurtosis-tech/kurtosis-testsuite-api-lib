// TODO Rename this envvar, since the testsuite can accept whatever it wants - doesn't have to be JSON
const CUSTOM_PARAMS_JSON_ENV_VAR = "CUSTOM_PARAMS_JSON";
const DEBUGGER_PORT_ENV_VAR = "DEBUGGER_PORT";
const KURTOSIS_API_SOCKET_ENV_VAR = "KURTOSIS_API_SOCKET"; // Only populated if in test-running mode
const LOG_LEVEL_ENV_VAR = "LOG_LEVEL";

/*
The dirpath on the testsuite container where the enclave data volume will be mounted
This is hardcoded because there's no real reason for it to be parameterized.
*/
const ENCLAVE_DATA_VOLUME_MOUNTPOINT = "/kurtosis-enclave-data";