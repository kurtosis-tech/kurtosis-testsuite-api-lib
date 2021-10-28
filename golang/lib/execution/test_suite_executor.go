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

package execution

import (
	"github.com/kurtosis-tech/kurtosis-engine-api-lib/golang/kurtosis_engine_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-engine-api-lib/golang/lib/networks"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_docker_api"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_consts"
	"github.com/kurtosis-tech/minimal-grpc-server/golang/server"
	"github.com/kurtosis-tech/stacktrace"
	"google.golang.org/grpc"
	"os"
	"time"
)

const (
	grpcServerStopGracePeriod = 5 * time.Second
)

type TestSuiteExecutor struct {
	configurator TestSuiteConfigurator
}

func NewTestSuiteExecutor(configurator TestSuiteConfigurator) *TestSuiteExecutor {
	return &TestSuiteExecutor{configurator: configurator}
}

func (executor TestSuiteExecutor) Run() error {
	// NOTE: These can be empty if the testsuite is in metadata-providing mode
	engineSocketStr := os.Getenv(kurtosis_testsuite_docker_api.EngineSocketEnvVar)
	enclaveId := os.Getenv(kurtosis_testsuite_docker_api.EnclaveIDEnvVar)

	logLevelStr, found := os.LookupEnv(kurtosis_testsuite_docker_api.LogLevelEnvVar)
	if !found {
		return stacktrace.NewError("Expected an '%v' environment variable containing the log level string that the testsuite should log at, but none was found", kurtosis_testsuite_docker_api.LogLevelEnvVar)
	}
	if logLevelStr == "" {
		return stacktrace.NewError("The '%v' loglevel environment variable was defined, but is empty string", kurtosis_testsuite_docker_api.LogLevelEnvVar)
	}

	customSerializedParamsStr, found := os.LookupEnv(kurtosis_testsuite_docker_api.CustomParamsJsonEnvVar)
	if !found {
		return stacktrace.NewError("Expected an '%v' environment variable containing the serialized custom params that the testsuite will consume, but none was found", kurtosis_testsuite_docker_api.CustomParamsJsonEnvVar)
	}
	if customSerializedParamsStr == "" {
		return stacktrace.NewError("The '%v' serialized custom params environment variable was defined, but is emptystring", kurtosis_testsuite_docker_api.CustomParamsJsonEnvVar)
	}

	if err := executor.configurator.SetLogLevel(logLevelStr); err != nil {
		return stacktrace.Propagate(err, "An error occurred setting the loglevel before running the testsuite")
	}

	suite, err := executor.configurator.ParseParamsAndCreateSuite(customSerializedParamsStr)
	if err != nil {
		return stacktrace.Propagate(err, "An error occurred parsing the serialized testsuite params and creating the testsuite")
	}

	var testsuiteService kurtosis_testsuite_rpc_api_bindings.TestSuiteServiceServer
	if engineSocketStr == "" {
		testsuiteService = NewMetadataProvidingTestsuiteService(suite)
	} else {
		// TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers
		conn, err := grpc.Dial(engineSocketStr, grpc.WithInsecure())
		if err != nil {
			return stacktrace.Propagate(
				err,
				"An error occurred creating a connection to the Kurtosis API server at '%v'",
				engineSocketStr,
			)
		}
		defer conn.Close()

		apiContainerClient := kurtosis_engine_rpc_api_bindings.NewEngineServiceClient(conn)
		networkCtx := networks.NewNetworkContext(
			apiContainerClient,
			enclaveId,
			kurtosis_testsuite_docker_api.EnclaveDataDirMountpoint,
		)
		testsuiteService = NewTestExecutingTestsuiteService(suite.GetTests(), networkCtx)
	}

	testsuiteServiceRegistrationFunc := func(grpcServer *grpc.Server) {
		kurtosis_testsuite_rpc_api_bindings.RegisterTestSuiteServiceServer(grpcServer, testsuiteService)
	}

	testsuiteServer := server.NewMinimalGRPCServer(
		kurtosis_testsuite_rpc_api_consts.ListenPort,
		kurtosis_testsuite_rpc_api_consts.ListenProtocol,
		grpcServerStopGracePeriod,
		[]func(desc *grpc.Server) {
			testsuiteServiceRegistrationFunc,
		},
	)
	if err := testsuiteServer.Run(); err != nil {
		return stacktrace.Propagate(err, "An error occurred running the testsuite server")
	}

	return nil
}
