package execution

import (
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/networks"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_docker_api"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_consts"
	"github.com/kurtosis-tech/minimal-grpc-server/server"
	"github.com/palantir/stacktrace"
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
	// NOTE: This can be empty if the testsuite is in metadata-providing mode
	kurtosisApiSocketStr := os.Getenv(kurtosis_testsuite_docker_api.KurtosisApiSocketEnvVar)

	logLevelStr, found := os.LookupEnv(kurtosis_testsuite_docker_api.LogLevelEnvVar)
	if !found {
		return stacktrace.NewError("Expected an '%v' environment variable containing the log level string that the testsuite should log at, but none was found", kurtosis_testsuite_docker_api.LogLevelEnvVar)
	}
	if logLevelStr == "" {
		return stacktrace.NewError("The '%v' loglevel environment variable was defined, but is emptystring", kurtosis_testsuite_docker_api.LogLevelEnvVar)
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
	if kurtosisApiSocketStr == "" {
		testsuiteService = NewMetadataProvidingTestsuiteService(suite)
	} else {
		// TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers
		conn, err := grpc.Dial(kurtosisApiSocketStr, grpc.WithInsecure())
		if err != nil {
			return stacktrace.Propagate(
				err,
				"An error occurred creating a connection to the Kurtosis API server at '%v'",
				kurtosisApiSocketStr,
			)
		}
		defer conn.Close()

		apiContainerClient := kurtosis_core_rpc_api_bindings.NewApiContainerServiceClient(conn)
		networkCtx := networks.NewNetworkContext(
			apiContainerClient,
			kurtosis_testsuite_docker_api.EnclaveDataVolumeMountpoint,
		)
		testsuiteService = NewTestExecutingTestsuiteService(suite, networkCtx)
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
