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

package execution

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite"
	"github.com/palantir/stacktrace"
	"google.golang.org/protobuf/types/known/emptypb"
)

// Service handlign endpoints when the testsuite is in metadata-providing mode - i.e. NOT running a testnet, without a connection to an API container
type MetadataProvidingTestsuiteService struct {
	kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer

	suite testsuite.TestSuite
}

func NewMetadataProvidingTestsuiteService(suite testsuite.TestSuite) *MetadataProvidingTestsuiteService {
	return &MetadataProvidingTestsuiteService{suite: suite}
}

func (service MetadataProvidingTestsuiteService) IsAvailable(ctx context.Context, empty *emptypb.Empty) (*emptypb.Empty, error) {
	return &emptypb.Empty{}, nil
}

func (service MetadataProvidingTestsuiteService) GetTestSuiteMetadata(ctx context.Context, empty *emptypb.Empty) (*kurtosis_testsuite_rpc_api_bindings.TestSuiteMetadata, error) {
	allTestMetadata := map[string]*kurtosis_testsuite_rpc_api_bindings.TestMetadata{}
	for testName, test := range service.suite.GetTests() {
		testConfigBuilder := testsuite.NewTestConfigurationBuilder()
		test.Configure(testConfigBuilder)
		testConfig := testConfigBuilder.Build()
		testMetadata := &kurtosis_testsuite_rpc_api_bindings.TestMetadata{
			IsPartitioningEnabled: testConfig.IsPartitioningEnabled,
			TestSetupTimeoutInSeconds: testConfig.SetupTimeoutSeconds,
			TestRunTimeoutInSeconds: testConfig.RunTimeoutSeconds,
		}
		allTestMetadata[testName] = testMetadata
	}

	testSuiteMetadata := &kurtosis_testsuite_rpc_api_bindings.TestSuiteMetadata{
		TestMetadata:     allTestMetadata,
	}

	return testSuiteMetadata, nil
}

func (service MetadataProvidingTestsuiteService) RegisterFiles(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RegisterFilesArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a register files call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

func (service MetadataProvidingTestsuiteService) SetupTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.SetupTestArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a setup test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

func (service MetadataProvidingTestsuiteService) RunTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RunTestArgs) (*emptypb.Empty, error) {
	return nil, stacktrace.NewError("Received a run test call while the testsuite service is in metadata-providing mode; this is a bug in Kurtosis")
}

