//import "github.com/kurtosis-tech/kurtosis-client/golang/lib/services" // TODO TODO TODO - once kurt-client ported

// vvvvvvvvv Update the docs if you change these vvvvvvvvvvv
const DEFAULT_SETUP_TIMEOUT_SECONDS = 180;
const DEFAULT_RUN_TIMEOUT_SECONDS = 180;
const DEFAULT_PARTITIONING_ENABLED = false;
// ^^^^^^^^^ Update the docs if you change these ^^^^^^^^^^^

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
class TestConfigurationBuilder {
	private setupTimeoutSeconds: number;
	private runTimeoutSeconds: number;
	private isPartioningEnabled: boolean;
	private staticFileFilepaths: Map<services.StaticFileID, string>
	private filesArtifactUrls: Map<services.FilesArtifactID, string>


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

    public withStaticFileFilepaths(staticFileFilepaths: Map<services.StaticFileID, string>): TestConfigurationBuilder {
        // TODO defensive copy
        this.staticFileFilepaths = staticFileFilepaths
        return this;
    }

    public withFilesArtifactUrls(filesArtifactUrls: Map<services.FilesArtifactID, string>): TestConfigurationBuilder {
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