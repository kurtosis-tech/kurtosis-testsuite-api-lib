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

    public getSetupTimeoutSeconds(): number {
        return this.setupTimeoutSeconds;
    }

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly runTimeoutSeconds: number;

    public getRunTimeoutSeconds(): number {
        return this.runTimeoutSeconds;
    }

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly isPartitioningEnabled: boolean;

    public getIsPartitioningEnabled(): boolean {
        return this.isPartitioningEnabled;
    }

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly staticFileFilepaths: Map<services.StaticFileID, string>;

    public getStaticFileFilepaths(): Map<services.StaticFileID, string> {
        return this.staticFileFilepaths;
    }

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly filesArtifactUrls: Map<services.FilesArtifactID, string>;

    public getFilesArtifactUrls(): Map<services.FilesArtifactID, string>{
        return this.filesArtifactUrls;
    }
}

