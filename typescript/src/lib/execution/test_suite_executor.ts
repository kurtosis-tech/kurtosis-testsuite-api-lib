import { TestSuiteServiceService, ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { NetworkContext, ApiContainerServiceClient } from "kurtosis-core-api-lib";
import { TestExecutingTestsuiteService } from "./test_executing_testsuite_service";
import { TestSuiteConfigurator } from "./test_suite_configurator";
import { MetadataProvidingTestsuiteService } from "./metadata_providing_testsuite_service";
import { TestSuite } from "../testsuite/test_suite";
import { KurtosisTestsuiteDockerEnvVar, ENCLAVE_DATA_DIR_MOUNTPOINT } from "../../kurtosis_testsuite_docker_api/kurtosis_testsuite_docker_api";
import { LISTEN_PORT } from "../../kurtosis_testsuite_rpc_api_consts/kurtosis_testsuite_rpc_api_consts";
import { Result, err, ok } from "neverthrow";
import * as grpc from "grpc";
import { MinimalGRPCServer, KnownKeysOnly, TypedServerOverride } from "minimal-grpc-server";

const GRPC_SERVER_STOP_GRACE_PERIOD_SECONDS: number = 5;

export class TestSuiteExecutor {
    private readonly configurator: TestSuiteConfigurator;
    
    constructor(configurator: TestSuiteConfigurator) {
        this.configurator = configurator;
    }

    public async run(): Promise<Result<null, Error>> {
        // NOTE: This can be empty if the testsuite is in metadata-providing mode
        const maybeKurtosisApiSocketStr: string | undefined = process.env[KurtosisTestsuiteDockerEnvVar.KurtosisApiSocket];
        if (maybeKurtosisApiSocketStr === undefined) {
            return err(new Error("Expected an '" + KurtosisTestsuiteDockerEnvVar.KurtosisApiSocket + "' string environment variable containing the kurtosis api socket string, but none was found"));
        }
        const kurtosisApiSocketStr: string = maybeKurtosisApiSocketStr!;

        const maybeLogLevelStr: string | undefined = process.env[KurtosisTestsuiteDockerEnvVar.LogLevel];
        if (maybeLogLevelStr === undefined) {
            return err(new Error("Expected an '" + KurtosisTestsuiteDockerEnvVar.LogLevel + "' environment variable containing the log level string that the testsuite should log at, but none was found"));
        }
        const logLevelStr: string = maybeLogLevelStr!;
        if (logLevelStr === "") {
            return err(new Error("The '" + KurtosisTestsuiteDockerEnvVar.LogLevel + "' loglevel environment variable was defined, but is empty string"));
        }

        const maybeCustomSerializedParamsStr: string | undefined = process.env[KurtosisTestsuiteDockerEnvVar.CustomParamsJson];
        if (maybeCustomSerializedParamsStr === undefined) {
            return err(new Error("Expected an '" + KurtosisTestsuiteDockerEnvVar.CustomParamsJson + "' environment variable containing the serialized custom params that the testsuite will consume, but none was found"));
        }
        const customSerializedParamsStr: string = maybeCustomSerializedParamsStr!;
        if (customSerializedParamsStr === "") {
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
        let apiContainerClient: ApiContainerServiceClient;
        let postShutdownHook: null | (() => void) = null;

        if (kurtosisApiSocketStr === "") {
            testsuiteService = new MetadataProvidingTestsuiteService(suite);
        } else {

            // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers             
            try {
                apiContainerClient = new ApiContainerServiceClient(kurtosisApiSocketStr, grpc.credentials.createInsecure());
            } catch(exception) {
                if (exception instanceof Error) {
                    return err(exception);
                }
                return err(new Error(
                    "An unknown exception value was thrown during creation of the API container client that wasn't an error: " + exception
                ));
            }

            postShutdownHook = () => apiContainerClient.close();
            const networkCtx: NetworkContext = new NetworkContext(apiContainerClient, ENCLAVE_DATA_DIR_MOUNTPOINT);
            testsuiteService = new TestExecutingTestsuiteService(suite.getTests(), networkCtx);
        }

        try {
            const serviceRegistrationFuncs: { (server: TypedServerOverride): void; }[] = [
                (server: TypedServerOverride) => {
                    server.addTypedService(TestSuiteServiceService, testsuiteService);
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
            if (postShutdownHook) {
                postShutdownHook();
            }
        }
    }
}
