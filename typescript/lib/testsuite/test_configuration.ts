/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

//import "github.com/kurtosis-tech/kurtosis-client/golang/lib/services" //TODO TODO TODO - once kurt-client is done ported

// TODO Make these fields private, with getters - TODO TODO TODO (Ali addressed this)
// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
class TestConfiguration {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly setupTimeoutSeconds: number;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly runTimeoutSeconds: number;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly isPartitioningEnabled: boolean;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly staticFileFilepaths: Map<services.StaticFileID, string>;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly filesArtifactUrls: Map<services.FilesArtifactID, string>;

    constructor(
        setupTimeoutSeconds: number, 
        runTimeoutSeconds: number, 
        isPartitioningEnabled: boolean, 
        staticFileFilepaths: Map<services.StaticFileID, string>,
        filesArtifactUrls: Map<services.FilesArtifactID, string>) {
            this.setupTimeoutSeconds = setupTimeoutSeconds;
            this.runTimeoutSeconds = runTimeoutSeconds;
            this.isPartitioningEnabled = isPartitioningEnabled;
            this.staticFileFilepaths = staticFileFilepaths;
            this.filesArtifactUrls = filesArtifactUrls;
    }

    public getSetupTimeoutSeconds(): number {
        return this.setupTimeoutSeconds;
    }

    public getRunTimeoutSeconds(): number {
        return this.runTimeoutSeconds;
    }

    public getIsPartitioningEnabled(): boolean {
        return this.isPartitioningEnabled;
    }

    public getStaticFileFilepaths(): Map<services.StaticFileID, string> {
        return this.staticFileFilepaths;
    }

    public getStaticFileFilepaths(): Map<services.StaticFileID, string> {
        return this.staticFileFilepaths;
    }
}

