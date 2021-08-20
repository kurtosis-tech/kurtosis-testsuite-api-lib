/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { StaticFileID, FilesArtifactID } from "kurtosis-core-api-lib";

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
export class TestConfiguration {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly setupTimeoutSeconds: number;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly runTimeoutSeconds: number;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly isPartitioningEnabled: boolean;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly staticFileFilepaths: Map<StaticFileID, string>;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	private readonly filesArtifactUrls: Map<FilesArtifactID, string>;

    constructor(
            setupTimeoutSeconds: number, 
            runTimeoutSeconds: number, 
            isPartitioningEnabled: boolean, 
            staticFileFilepaths: Map<StaticFileID, string>,
            filesArtifactUrls: Map<FilesArtifactID, string>) {
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

    public getStaticFileFilepaths(): Map<StaticFileID, string> {
        return this.staticFileFilepaths;
    }

    public getFilesArtifactUrls(): Map<StaticFileID, string> {
        return this.filesArtifactUrls;
    }
}

