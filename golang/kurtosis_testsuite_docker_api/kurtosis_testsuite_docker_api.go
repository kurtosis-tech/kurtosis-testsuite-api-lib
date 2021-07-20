package kurtosis_testsuite_docker_api

const (
	CustomParamsJsonEnvVar  = "CUSTOM_PARAMS_JSON"
	DebuggerPortEnvVar      = "DEBUGGER_PORT"
	KurtosisApiSocketEnvVar = "KURTOSIS_API_SOCKET" // Only populated if in test-running mode
	LogLevelEnvVar          = "LOG_LEVEL"


	/*
	The dirpath on the testsuite container where the execution volume will be mounted
	This is hardcoded because there's no real reason for it to be parameterized.
	*/
	TestsuiteContainerSuiteExVolMountpoint = "/suite-execution"
)
