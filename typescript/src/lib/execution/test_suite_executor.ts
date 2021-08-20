import { TestSuiteServiceService, ITestSuiteServiceService } from "../../kurtosis_testsuite_rpc_api_bindings/testsuite_service_grpc_pb";
import { NetworkContext, newApiContainerServiceClient } from "kurtosis-core-api-lib"; //TODO
import { TestExecutingTestsuiteService } from "./test_executing_testsuite_service";
import { TestSuiteConfigurator } from "./test_suite_configurator";
import { MetadataProvidingTestsuiteService } from "./metadata_providing_testsuite_service";
import { TestSuite } from "../testsuite/test_suite"; //TODO
import { KurtosisTestsuiteDockerEnvVar, ENCLAVE_DATA_VOLUME_MOUNTPOINT } from "../../kurtosis_testsuite_docker_api/kurtosis_testsuite_docker_api";
import { LISTEN_PORT } from "../../kurtosis_testsuite_rpc_api_consts/kurtosis_testsuite_rpc_api_consts";
//"github.com/kurtosis-tech/minimal-grpc-server/server" //TODO
import { Result, err, ok } from "neverthrow";
import * as grpc from "grpc";
import * as log from "loglevel";

//TODO Below
//import { process } from "node"; //TODO - don't need line but need the dependency = npm i --save-dev @types/node for EnvVar
import * as dotenv from 'dotenv'; //"os" //TODO
//import * as time from "date-and-time"; //npm i --save-dev @types/date-and-time
//import * as date from "date-fns"; //npm install date-fns --save

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

    public async run(): Promise<Result<null, Error>> { //TODO - return type
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

        // TODO This should use Result<null>!
        const logLevelErr: Error = this.configurator.setLogLevel(logLevelStr);
        if (logLevelErr !== null) {
            return err(logLevelErr);
        }

        const parseParamsAndCreateSuiteResult: Result<TestSuite, Error> = this.configurator.parseParamsAndCreateSuite(customSerializedParamsStr);
        if (!parseParamsAndCreateSuiteResult.isOk()) {
            return err(parseParamsAndCreateSuiteResult.error);
        }
        const suite: TestSuite = parseParamsAndCreateSuiteResult.value;

        let testsuiteService: ITestSuiteServiceService;
        if (kurtosisApiSocketStr === "") {
            testsuiteService = new MetadataProvidingTestsuiteService(suite);
        } else {

            // TODO SECURITY: Use HTTPS to ensure we're connecting to the real Kurtosis API servers
            // TODO need to wrap this in exception-handling
            const conn: grpc.Client = new grpc.Client(kurtosisApiSocketStr, grpc.credentials.createInsecure());

            // TODO Your try-finally needs to be a lot bigger than this - as-is, this connection will get closed almost immediately (long before the server starts)
            try {
                const apiContainerClient: newApiContainerServiceClient = newApiContainerServiceClient(conn);
                const networkCtx: NetworkContext = NetworkContext(apiContainerClient, ENCLAVE_DATA_VOLUME_MOUNTPOINT);
                testsuiteService = new TestExecutingTestsuiteService(suite, networkCtx);
            } finally {
                conn.Close()
            }
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
    }
}
