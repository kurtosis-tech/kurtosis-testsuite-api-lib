import { StaticFileID, FilesArtifactID } from "kurtosis-core-api-lib" // TODO TODO TODO - once kurt-client npm package is published
import { TestConfiguration } from "./test_configuration";

// vvvvvvvvv Update the docs if you change these vvvvvvvvvvv
const DEFAULT_SETUP_TIMEOUT_SECONDS = 180;
const DEFAULT_RUN_TIMEOUT_SECONDS = 180;
const DEFAULT_PARTITIONING_ENABLED = false;
// ^^^^^^^^^ Update the docs if you change these ^^^^^^^^^^^

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
export class TestConfigurationBuilder {
	private setupTimeoutSeconds: number;
	private runTimeoutSeconds: number;
	private isPartioningEnabled: boolean;
	private staticFileFilepaths: Map<StaticFileID, string>;
	private filesArtifactUrls: Map<FilesArtifactID, string>;


    constructor () {
        this.setupTimeoutSeconds = DEFAULT_SETUP_TIMEOUT_SECONDS;
        this.runTimeoutSeconds = DEFAULT_RUN_TIMEOUT_SECONDS;
        this.isPartioningEnabled = DEFAULT_PARTITIONING_ENABLED;
        this.staticFileFilepaths = new Map();
        this.filesArtifactUrls = new Map();
    }

    public withSetupTimeoutSeconds(setupTimeoutSeconds: number): TestConfigurationBuilder {
        this.setupTimeoutSeconds = setupTimeoutSeconds
        return this;
    }

    public withRunTimeoutSeconds(runTimeoutSeconds: number): TestConfigurationBuilder {
        this.runTimeoutSeconds = runTimeoutSeconds;
        return this;
    }

    public withPartitioningEnabled(isPartitioningEnabled: boolean): TestConfigurationBuilder {
        this.isPartioningEnabled = isPartitioningEnabled;
        return this;
    }

    public withStaticFileFilepaths(staticFileFilepaths: Map<StaticFileID, string>): TestConfigurationBuilder {
        // TODO defensive copy
        this.staticFileFilepaths = staticFileFilepaths
        return this;
    }

    public withFilesArtifactUrls(filesArtifactUrls: Map<FilesArtifactID, string>): TestConfigurationBuilder {
        // TODO defensive copy
        this.filesArtifactUrls = filesArtifactUrls;
        return this;
    }

    public build(): TestConfiguration {
        return new TestConfiguration(
			this.setupTimeoutSeconds, 
			this.runTimeoutSeconds, 
			this.isPartioningEnabled, 
			this.staticFileFilepaths, 
			this.filesArtifactUrls);
    }

}