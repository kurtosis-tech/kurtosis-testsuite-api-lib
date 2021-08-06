/*
 *    Copyright 2021 Kurtosis Technologies Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

package testsuite

import "github.com/kurtosis-tech/kurtosis-client/golang/lib/services"

// TODO Make these fields private, with getters
// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type TestConfiguration struct {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	SetupTimeoutSeconds uint32

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	RunTimeoutSeconds uint32

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	IsPartitioningEnabled bool

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	StaticFileFilepaths map[services.StaticFileID]string

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	FilesArtifactUrls map[services.FilesArtifactID]string
}

