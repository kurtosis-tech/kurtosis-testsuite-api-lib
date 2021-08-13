"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings" //TODO
"github.com/kurtosis-tech/kurtosis-client/golang/lib/networks" //TODO 
import { } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { TestSuiteServiceServer, newApiContainerServiceClient } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_pb";
import { TestSuiteConfigurator } from "./test_suite_configurator";
import { MetadataProvidingTestsuiteService } from "./metadata_providing_testsuite_service";
import { TestSuite } from "../testsuite"; //TODO
import { KurtosisTestsuiteDockerEnvVar } from "../../kurtosis_testsuite_docker_api/kurtosis_testsuite_docker_api";
import { } from "../../kurtosis_testsuite_rpc_api_consts/kurtosis_testsuite_rpc_api_consts";
import { Result } from "neverthrow";
"github.com/kurtosis-tech/minimal-grpc-server/server" //TODO
import * as grpc from "grpc";
"os"
//TODO Below
//import { process } from "node"; //TODO - don't need line but need the dependency = npm i --save-dev @types/node
import * as dotenv from 'dotenv';
//import * as time from "date-and-time"; //npm i --save-dev @types/date-and-time
//import * as date from "date-fns"; //npm install date-fns --save

dotenv.config();
const GRPC_SERVER_STOP_GRACE_PERIOD: number = 5 * date.getSeconds(); //TODO

class TestSuiteExecutor {
	private readonly configurator: TestSuiteConfigurator;


    constructor(configurator: TestSuiteConfigurator) {
        this.configurator = configurator;
    }

    public run(): Error { //TODO - should I add Result here
        // NOTE: This can be empty if the testsuite is in metadata-providing mode
        const KurtosisApiSocket: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.KurtosisApiSocket; //TODO - why can't it see that its being read right below
        const kurtosisApiSocketStr: string = process.env.KurtosisApiSocket; //TODO - Does this receive the environment variable, gives error if I do env.(......) and put something in brackets

        const logLevel: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.LogLevel;
        const logLevelStr: string = process.env.LogLevel;
        
        // if (logLevelStr == "") { //TODO - assuming empty string is error, how else do I check error
        //     return new Error("Expected an '%v' environment variable containing the log level string that the testsuite should log at, but none was found", logLevel);
        // }
        if (logLevelStr == "") {
            return new Error("The '" + logLevel + "' loglevel environment variable was defined, but is emptystring");
        }

        const customParamsJsonEnvVar: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.CustomParamsJson;
        const customSerializedParamsStr: string = process.env.customParamsJsonEnvVar;
        // if !found { //TODO
        //     return stacktrace.NewError("Expected an '%v' environment variable containing the serialized custom params that the testsuite will consume, but none was found", kurtosis_testsuite_docker_api.CustomParamsJsonEnvVar)
        // }
        if (customSerializedParamsStr == "") {
            return new Error("The '" + customParamsJsonEnvVar + "' serialized custom params environment variable was defined, but is emptystring");
        }

        const logLevelErr: Error = this.configurator.setLogLevel(logLevelStr);
        if (logLevelErr != null) {
            return logLevelErr;
        }

        const parseParamsAndCreateSuiteResult: Result<TestSuite, Error> = this.configurator.parseParamsAndCreateSuite(customSerializedParamsStr);
        if (!parseParamsAndCreateSuiteResult.isOk()) {
            return parseParamsAndCreateSuiteResult.error;
        }
        const suite: TestSuite = parseParamsAndCreateSuiteResult.value;

        var testsuiteService: TestSuiteServiceServer; //TODO
        if (kurtosisApiSocketStr == "") {
            testsuiteService = new MetadataProvidingTestsuiteService(suite)
        } else {
            try {
                // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers
                const conn: grpc.Client = new grpc.Client(kurtosisApiSocketStr, grpc.ChannelCredentials) //TODO - grpc.ChannelCredentials, error checking
                if (error != null) { //TODO Error checking
                    return error;
                }

                const apiContainerClient: = newApiContainerServiceClient(conn) //TODO - no such file
                networkCtx := networks.NewNetworkContext(
                    apiContainerClient,
                    kurtosis_testsuite_docker_api.EnclaveDataVolumeMountpoint,
                )
                testsuiteService = NewTestExecutingTestsuiteService(suite, networkCtx)
            } finally {
                conn.Close()
            }
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

        return null;
    }
}