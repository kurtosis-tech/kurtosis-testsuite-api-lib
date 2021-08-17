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
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/networks"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/kurtosis_testsuite_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite"
	"github.com/palantir/stacktrace"
	"github.com/sirupsen/logrus"
	"google.golang.org/protobuf/types/known/emptypb"
	"sync"
)

// Service for handling endpoints when the testsuite is in test-executing mode - i.e., inside a testsnet and running a single test
type TestExecutingTestsuiteService struct {
	// This embedding is required by gRPC
	kurtosis_testsuite_rpc_api_bindings.UnimplementedTestSuiteServiceServer

	suite testsuite.TestSuite

	// Will be nil until setup is called
	postSetupNetwork networks.Network

	// Mutex to guard the postSetupNetwork object, so any accidental concurrent calls of SetupInfo don't generate race conditions
	postSetupNetworkMutex *sync.Mutex

	networkCtx *networks.NetworkContext
}

func NewTestExecutingTestsuiteService(suite testsuite.TestSuite, networkCtx *networks.NetworkContext) *TestExecutingTestsuiteService {
	return &TestExecutingTestsuiteService{
		suite:              suite,
		postSetupNetwork:      nil,
		postSetupNetworkMutex: &sync.Mutex{},
		networkCtx: networkCtx,
	}
}

func (service TestExecutingTestsuiteService) GetModuleInfo(ctx context.Context, empty *emptypb.Empty) (*kurtosis_testsuite_rpc_api_bindings.ModuleInfoResponse, error) {
	return
}

func (service TestExecutingTestsuiteService) GetTestSuiteMetadata(ctx context.Context, empty *emptypb.Empty) (*kurtosis_testsuite_rpc_api_bindings.TestSuiteMetadata, error) {
	return nil, stacktrace.NewError("Received a get suite metadata call while the testsuite service is in test-executing mode; this is a bug in Kurtosis")
}

func (service TestExecutingTestsuiteService) RegisterFiles(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RegisterFilesArgs) (*emptypb.Empty, error) {
	testName := args.TestName
	allTests := service.suite.GetTests()
	test, found := allTests[testName]
	if !found {
		return nil, stacktrace.NewError("No test '%v' found in the testsuite", testName)
	}

	testConfigBuilder := testsuite.NewTestConfigurationBuilder()
	test.Configure(testConfigBuilder)
	testConfig := testConfigBuilder.Build()

	if err := service.networkCtx.RegisterStaticFiles(testConfig.StaticFileFilepaths); err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred registering the testsuite's static files")
	}
	if err := service.networkCtx.RegisterFilesArtifacts(testConfig.FilesArtifactUrls); err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred registering the testsuite's files artifact URLs")
	}
	return &emptypb.Empty{}, nil
}

func (service *TestExecutingTestsuiteService) SetupTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.SetupTestArgs) (*emptypb.Empty, error) {
	service.postSetupNetworkMutex.Lock()
	defer service.postSetupNetworkMutex.Unlock()

	if service.postSetupNetwork != nil {
		return nil, stacktrace.NewError("Cannot setup test; a test was already set up")
	}

	testName := args.TestName

	allTests := service.suite.GetTests()
	test, found := allTests[testName]
	if !found {
		return nil, stacktrace.NewError(
			"Testsuite was directed to setup test '%v', but no test with that name exists " +
				"in the testsuite; this is a Kurtosis code bug",
			testName,
		)
	}

	logrus.Infof("Setting up network for test '%v'...", testName)
	userNetwork, err := test.Setup(service.networkCtx)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred during test setup")
	}
	if userNetwork == nil {
		return nil, stacktrace.NewError("The test setup method returned successfully, but yielded a nil network object - this is a bug with the test's setup method accidentally returning a nil network object")
	}
	service.postSetupNetwork = userNetwork
	logrus.Infof("Successfully set up test network for test '%v'", testName)

	return &emptypb.Empty{}, nil
}

func (service TestExecutingTestsuiteService) RunTest(ctx context.Context, args *kurtosis_testsuite_rpc_api_bindings.RunTestArgs) (*emptypb.Empty, error) {
	service.postSetupNetworkMutex.Lock()
	defer service.postSetupNetworkMutex.Unlock()

	if service.postSetupNetwork == nil {
		return nil, stacktrace.NewError("Received a request to run the test, but the test hasn't been set up yet")
	}

	testName := args.TestName

	allTests := service.suite.GetTests()
	test, found := allTests[testName]
	if !found {
		return nil, stacktrace.NewError(
			"Testsuite was directed to run test '%v', but no test with that name exists " +
				"in the testsuite; this is a Kurtosis code bug",
			testName,
		)
	}

	logrus.Infof("Running test logic for test '%v'...", testName)
	if err := runTest(test, service.postSetupNetwork); err != nil {
		return nil, stacktrace.Propagate(
			err,
			"An error occurred running test '%v'",
			testName,
		)
	}
	logrus.Infof("Ran test logic for test '%v'", testName)
	return &emptypb.Empty{}, nil
}

// Little helper function that runs the test and captures panics on test failures, returning them as errors
func runTest(test testsuite.Test, untypedNetwork interface{}) (resultErr error) {
	// See https://medium.com/@hussachai/error-handling-in-go-a-quick-opinionated-guide-9199dd7c7f76 for details
	defer func() {
		if recoverResult := recover(); recoverResult != nil {
			logrus.Tracef("Caught panic while running test: %v", recoverResult)
			resultErr = recoverResult.(error)
		}
	}()
	if err := test.Run(untypedNetwork); err != nil {
		return stacktrace.Propagate(err, "The test returned an error")
	}
	logrus.Tracef("Test completed successfully")
	return
}
