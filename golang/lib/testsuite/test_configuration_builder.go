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

import "github.com/kurtosis-tech/kurtosis-engine-api-lib/golang/lib/services"

const (
	// vvvvvvvvv Update the docs if you change these vvvvvvvvvvv
	defaultSetupTimeoutSeconds = 180;
	defaultRunTimeoutSeconds = 180;
	defaultPartitioningEnabled = false;
	// ^^^^^^^^^ Update the docs if you change these ^^^^^^^^^^^
)

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type TestConfigurationBuilder struct {
	setupTimeoutSeconds uint32
	runTimeoutSeconds uint32
	isPartioningEnabled bool
	filesArtifactUrls map[services.FilesArtifactID]string
}

func NewTestConfigurationBuilder() *TestConfigurationBuilder {
	return &TestConfigurationBuilder{
		setupTimeoutSeconds: defaultSetupTimeoutSeconds,
		runTimeoutSeconds:   defaultRunTimeoutSeconds,
		isPartioningEnabled: defaultPartitioningEnabled,
		filesArtifactUrls:   map[services.FilesArtifactID]string{},
	}
}

func (builder *TestConfigurationBuilder) WithSetupTimeoutSeconds(setupTimeoutSeconds uint32) *TestConfigurationBuilder {
	builder.setupTimeoutSeconds = setupTimeoutSeconds
	return builder
}

func (builder *TestConfigurationBuilder) WithRunTimeoutSeconds(runTimeoutSeconds uint32) *TestConfigurationBuilder {
	builder.runTimeoutSeconds = runTimeoutSeconds
	return builder
}

func (builder *TestConfigurationBuilder) WithPartitioningEnabled(isPartitioningEnabled bool) *TestConfigurationBuilder {
	builder.isPartioningEnabled = isPartitioningEnabled
	return builder
}

func (builder *TestConfigurationBuilder) WithFilesArtifactUrls(filesArtifactUrls map[services.FilesArtifactID]string) *TestConfigurationBuilder {
	// TODO defensive copy
	builder.filesArtifactUrls = filesArtifactUrls
	return builder
}

func (builder TestConfigurationBuilder) Build() *TestConfiguration {
	return &TestConfiguration{
		SetupTimeoutSeconds:   builder.setupTimeoutSeconds,
		RunTimeoutSeconds:     builder.runTimeoutSeconds,
		IsPartitioningEnabled: builder.isPartioningEnabled,
		FilesArtifactUrls:     builder.filesArtifactUrls,
	}
}
