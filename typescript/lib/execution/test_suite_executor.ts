import { ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { NetworkContext, newApiContainerServiceClient } from "kurtosis-core-api-lib"; //TODO
import { TestExecutingTestsuiteService } from "./test_executing_testsuite_service";
import { TestSuiteConfigurator } from "./test_suite_configurator";
import { MetadataProvidingTestsuiteService } from "./metadata_providing_testsuite_service";
import { TestSuite } from "../testsuite/test_suite"; //TODO
import { KurtosisTestsuiteDockerEnvVar, ENCLAVE_DATA_VOLUME_MOUNTPOINT } from "../../kurtosis_testsuite_docker_api/kurtosis_testsuite_docker_api";
//import { LISTEN_PORT, LISTEN_PROTOCOL } from "../../kurtosis_testsuite_rpc_api_consts/kurtosis_testsuite_rpc_api_consts"; //need for minimial_grpc_server
//"github.com/kurtosis-tech/minimal-grpc-server/server" //TODO
import { Result, err, ok } from "neverthrow";
import * as grpc from "grpc";

//TODO Below
//import { process } from "node"; //TODO - don't need line but need the dependency = npm i --save-dev @types/node for EnvVar
import * as dotenv from 'dotenv'; //"os" //TODO
//import * as time from "date-and-time"; //npm i --save-dev @types/date-and-time
//import * as date from "date-fns"; //npm install date-fns --save

dotenv.config();
//const GRPC_SERVER_STOP_GRACE_PERIOD: number = 5 * time.Second; //TODO - needed for minimial GRPC server

class TestSuiteExecutor {
	private readonly configurator: TestSuiteConfigurator;


    constructor(configurator: TestSuiteConfigurator) {
        this.configurator = configurator;
    }

    public run(): Result<null, Error> { //TODO - return type
        // NOTE: This can be empty if the testsuite is in metadata-providing mode
        const KurtosisApiSocket: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.KurtosisApiSocket; //TODO - why can't it see that its being read right below
        const kurtosisApiSocketStr: string = process.env.KurtosisApiSocket; //TODO - Does this receive the environment variable, gives error if I do env.(......) and put something in brackets

        const logLevel: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.LogLevel;
        const logLevelStr: string = process.env.LogLevel;
        
        // if !found { //TODO - process.env does not return some form of error, so I can only check error is str is empty
        //     return new Error("Expected an '%v' environment variable containing the log level string that the testsuite should log at, but none was found", logLevel);
        // }
        if (logLevelStr == "") {
            return err(new Error("The '" + logLevel + "' loglevel environment variable was defined, but is emptystring"));
        }

        const customParamsJsonEnvVar: KurtosisTestsuiteDockerEnvVar = KurtosisTestsuiteDockerEnvVar.CustomParamsJson;
        const customSerializedParamsStr: string = process.env.customParamsJsonEnvVar;
        // if !found { //TODO
        //     return stacktrace.NewError("Expected an '%v' environment variable containing the serialized custom params that the testsuite will consume, but none was found", kurtosis_testsuite_docker_api.CustomParamsJsonEnvVar)
        // }
        if (customSerializedParamsStr == "") {
            return err(new Error("The '" + customParamsJsonEnvVar + "' serialized custom params environment variable was defined, but is emptystring"));
        }

        const logLevelErr: Error = this.configurator.setLogLevel(logLevelStr);
        if (logLevelErr != null) {
            return err(logLevelErr);
        }

        const parseParamsAndCreateSuiteResult: Result<TestSuite, Error> = this.configurator.parseParamsAndCreateSuite(customSerializedParamsStr);
        if (!parseParamsAndCreateSuiteResult.isOk()) {
            return err(parseParamsAndCreateSuiteResult.error);
        }
        const suite: TestSuite = parseParamsAndCreateSuiteResult.value;

        var testsuiteService: ITestSuiteServiceServer; //TODO
        if (kurtosisApiSocketStr == "") {
            testsuiteService = new MetadataProvidingTestsuiteService(suite)
        } else {

            // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers
            const conn: grpc.Client = new grpc.Client(kurtosisApiSocketStr, grpc.credentials~ChannelCredentials); //TODO - grpc.ChannelCredentials, error checking with grpc.Client, would grpc.handleUnaryCall get the job done like grpc.Dial in golang?
            if (error != null) { //TODO Error checking
                return err(error);
            }

            try {
                const apiContainerClient: newApiContainerServiceClient = newApiContainerServiceClient(conn);
                const networkCtx: NetworkContext = NetworkContext(apiContainerClient, ENCLAVE_DATA_VOLUME_MOUNTPOINT);
                testsuiteService = new TestExecutingTestsuiteService(suite, networkCtx);
            } finally {
                conn.Close()
            }
        }

        const testsuiteServiceRegistrationFunc: (grpcServer: grpc.Server) => void = (grpcServer: grpc.Server) => {
            kurtosis_testsuite_rpc_api_bindings.RegisterTestSuiteServiceServer(grpcServer, testsuiteService) //TODO - RegisterTestSuiteServiceServer (no such line)
        }

        //TODO TODO TODO - don't need this right now, but needed when we hit lambda-api-lib
        // testsuiteServer := server.NewMinimalGRPCServer(
        //     kurtosis_testsuite_rpc_api_consts.ListenPort,
        //     kurtosis_testsuite_rpc_api_consts.ListenProtocol,
        //     GRPC_SERVER_STOP_GRACE_PERIOD,
        //     []func(desc *grpc.Server) {
        //         testsuiteServiceRegistrationFunc,
        //     },
        // )
        // if err := testsuiteServer.Run(); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred running the testsuite server")
        // }

        return ok(null);
    }
}