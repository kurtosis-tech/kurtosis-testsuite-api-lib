/*
 *    Copyright 2021 Kurtosis Technologies Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

package kurtosis_testsuite_docker_api

const (
	// TODO Rename this envvar, since the testsuite can accept whatever it wants - doesn't have to be JSON
	CustomParamsJsonEnvVar  = "CUSTOM_PARAMS_JSON"
	DebuggerPortEnvVar      = "DEBUGGER_PORT"
	KurtosisApiSocketEnvVar = "KURTOSIS_API_SOCKET" // Only populated if in test-running mode
	LogLevelEnvVar          = "LOG_LEVEL"


	/*
	The dirpath on the testsuite container where the enclave data directory will be bind-mounted
	This is hardcoded because there's no real reason for it to be parameterized.
	*/
	EnclaveDataDirMountpoint = "/kurtosis-enclave-data"
)
