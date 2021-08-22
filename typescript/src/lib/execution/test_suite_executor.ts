import { TestSuiteServiceService, ITestSuiteServiceService, ITestSuiteServiceServer } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb"; //TODO (Ali) - make sure using right Services
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

dotenv.config();

const GRPC_SERVER_STOP_GRACE_PERIOD_MILLIS: number = 5000;
const INTERRUPT_SIGNAL: string = "SIGNINT"
const QUIT_SIGNAL: string = "SIGQUIT"
const TERM_SIGNAL: string = "SIGTERM"

class TestSuiteExecutor {
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

        const logLevelResult: Result<null, Error> = this.configurator.setLogLevelResult(logLevelStr);
        if (!logLevelResult.isOk()) {
            return err(logLevelResult.error);
        }

        const parseParamsAndCreateSuiteResult: Result<TestSuite, Error> = this.configurator.parseParamsAndCreateSuite(customSerializedParamsStr);
        if (!parseParamsAndCreateSuiteResult.isOk()) {
            return err(parseParamsAndCreateSuiteResult.error);
        }
        const suite: TestSuite = parseParamsAndCreateSuiteResult.value;

        let testsuiteService: ITestSuiteServiceServer; //TODO (Ali)
        let apiContainerClient: ApiContainerServiceClient;

        try {
            if (kurtosisApiSocketStr === "") {
                testsuiteService = new MetadataProvidingTestsuiteService(suite);
            } else {

                // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers             
                try {
                    apiContainerClient = new ApiContainerServiceClient(kurtosisApiSocketStr, grpc.credentials.createInsecure()); //TODO (Ali) (comment) - ApiContainerServiceClient extends grpc.Client
                }
                catch(clientErr) {
                    return err(clientErr);
                }

                const networkCtx: NetworkContext = new NetworkContext(apiContainerClient, ENCLAVE_DATA_VOLUME_MOUNTPOINT);
                testsuiteService = new TestExecutingTestsuiteService(suite, networkCtx);

            }

            // TODO Extract this to minimal-grpc-server
            const server: grpc.Server = new grpc.Server();
            server.addService(TestSuiteServiceService, testsuiteService);
            const listenUrl: string = ":" + LISTEN_PORT;
            const boundPort: number = server.bind(listenUrl, grpc.credentials.createInsecure());
            if (boundPort === 0) {
                return err(new Error("An error occurred binding the server to listen URL '"+ boundPort +"'"));
            }

            const signalsToHandle: Array<string> = [INTERRUPT_SIGNAL, QUIT_SIGNAL, TERM_SIGNAL];
            const signalReceivedPromises: Array<Promise<Result<null, Error>>> = signalsToHandle.map((signal) => {
                return new Promise((resolve, _unusedReject) => {
                    process.on(signal, () => {
                        resolve(ok(null));
                    });
                });
            });
            const anySignalReceivedPromise: Promise<Result<null, Error>> = Promise.race(signalReceivedPromises);

            server.start();

            await anySignalReceivedPromise;

            const tryShutdownPromise: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
                server.tryShutdown(() => {
                    resolve(ok(null));
                })
            })
            const timeoutPromise: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
                setTimeout(
                    () => {
                        resolve(err(new Error("gRPC server failed to stop gracefully after waiting for " + GRPC_SERVER_STOP_GRACE_PERIOD_MILLIS + "ms")));
                    },
                    GRPC_SERVER_STOP_GRACE_PERIOD_MILLIS
                );
            })
            const gracefulShutdownResult: Result<null, Error> = await Promise.race([tryShutdownPromise, timeoutPromise]);
            if (gracefulShutdownResult.isErr()) {
                log.debug("gRPC server has exited gracefully");
            } else {
                log.warn("gRPC server failed to stop gracefully after " + GRPC_SERVER_STOP_GRACE_PERIOD_MILLIS + "ms; hard-stopping now...");
                server.forceShutdown();
                log.debug("gRPC server was forcefully stopped");
            }

            return ok(null);
        } finally {
            apiContainerClient.close();
        }
    }
}
