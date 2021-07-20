/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

package testsuite

import "github.com/kurtosis-tech/kurtosis-client/golang/lib/services"

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type TestConfiguration struct {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	SetupTimeoutSeconds uint32

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	RunTimeoutSeconds uint32

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	IsPartitioningEnabled bool

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	FilesArtifactUrls map[services.FilesArtifactID]string

}
