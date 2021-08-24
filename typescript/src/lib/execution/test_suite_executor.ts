import { TestSuiteServiceService, ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { NetworkContext, ApiContainerServiceClient } from "kurtosis-core-api-lib";
import { TestExecutingTestsuiteService } from "./test_executing_testsuite_service";
import { TestSuiteConfigurator } from "./test_suite_configurator";
import { MetadataProvidingTestsuiteService } from "./metadata_providing_testsuite_service";
import { TestSuite } from "../testsuite/test_suite";
import { KurtosisTestsuiteDockerEnvVar, ENCLAVE_DATA_VOLUME_MOUNTPOINT } from "../../kurtosis_testsuite_docker_api/kurtosis_testsuite_docker_api";
import { LISTEN_PORT } from "../../kurtosis_testsuite_rpc_api_consts/kurtosis_testsuite_rpc_api_consts";
import { Result, err, ok } from "neverthrow";
import * as grpc from "grpc";
import * as log from "loglevel";
import * as dotenv from 'dotenv';
import { MinimalGRPCServer, KnownKeysOnly } from "minimal-grpc-server";

dotenv.config();

const GRPC_SERVER_STOP_GRACE_PERIOD_SECONDS: number = 5;
const INTERRUPT_SIGNAL: string = "SIGNINT"
const QUIT_SIGNAL: string = "SIGQUIT"
const TERM_SIGNAL: string = "SIGTERM"

export class TestSuiteExecutor {
    private readonly configurator: TestSuiteConfigurator;
    
    constructor(configurator: TestSuiteConfigurator) {
        this.configurator = configurator;
    }

    public async run(): Promise<Result<null, Error>> {
        // NOTE: This can be empty if the testsuite is in metadata-providing mode
        const kurtosisApiSocketStr: string = process.env[KurtosisTestsuiteDockerEnvVar.KurtosisApiSocket];

        if (!(KurtosisTestsuiteDockerEnvVar.LogLevel in process.env)) {
            return err(new Error("Expected an '" + KurtosisTestsuiteDockerEnvVar.LogLevel + "' environment variable containing the log level string that the testsuite should log at, but none was found"));
        }
        const logLevelStr: string = process.env[KurtosisTestsuiteDockerEnvVar.LogLevel];
        if (logLevelStr == "") {
            return err(new Error("The '" + KurtosisTestsuiteDockerEnvVar.LogLevel + "' loglevel environment variable was defined, but is emptystring"));
        }

        if (!(KurtosisTestsuiteDockerEnvVar.CustomParamsJson in process.env)) {
            return err(new Error("Expected an '" + KurtosisTestsuiteDockerEnvVar.CustomParamsJson + "' environment variable containing the serialized custom params that the testsuite will consume, but none was found"));
        }
        const customSerializedParamsStr: string = process.env[KurtosisTestsuiteDockerEnvVar.CustomParamsJson];
        if (customSerializedParamsStr == "") {
            return err(new Error("The '" + KurtosisTestsuiteDockerEnvVar.CustomParamsJson + "' serialized custom params environment variable was defined, but is emptystring"));
        }

        const setLogLevelResult: Result<null, Error> = this.configurator.setLogLevel(logLevelStr);
        if (!setLogLevelResult.isOk()) {
            return err(setLogLevelResult.error);
        }

        const parseParamsAndCreateSuiteResult: Result<TestSuite, Error> = this.configurator.parseParamsAndCreateSuite(customSerializedParamsStr);
        if (!parseParamsAndCreateSuiteResult.isOk()) {
            return err(parseParamsAndCreateSuiteResult.error);
        }
        const suite: TestSuite = parseParamsAndCreateSuiteResult.value;

        let testsuiteService: KnownKeysOnly<ITestSuiteServiceServer>;
        let apiContainerClient: ApiContainerServiceClient = null;

        if (kurtosisApiSocketStr === "") {
            testsuiteService = new MetadataProvidingTestsuiteService(suite);
        } else {

            // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers             
            try {
                apiContainerClient = new ApiContainerServiceClient(kurtosisApiSocketStr, grpc.credentials.createInsecure());
            } catch(clientErr) {
                return err(clientErr);
            }
        }

        try {
            if (kurtosisApiSocketStr !== "") { //TODO (Ali) - Does not follow DRY, but the solution I could think of
                const networkCtx: NetworkContext = new NetworkContext(apiContainerClient, ENCLAVE_DATA_VOLUME_MOUNTPOINT);
                testsuiteService = new TestExecutingTestsuiteService(suite, networkCtx);
            }

            const serviceRegistrationFuncs: { (server: grpc.Server): void; }[] = [
                (server: grpc.Server) => {
                    server.addService(TestSuiteServiceService, testsuiteService);
                }
            ]
            
            const grpcServer: MinimalGRPCServer = new MinimalGRPCServer(
                LISTEN_PORT, 
                GRPC_SERVER_STOP_GRACE_PERIOD_SECONDS,
                serviceRegistrationFuncs
            );

            const runServerResult = await grpcServer.run();
            if (runServerResult.isErr()) {
                return err(runServerResult.error);
            }

            return ok(null);
        } finally {
            if (apiContainerClient !== null) {
                apiContainerClient.close();
            }
        }
    }
}
