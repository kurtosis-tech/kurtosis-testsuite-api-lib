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

import "github.com/kurtosis-tech/kurtosis-engine-api-lib/golang/lib/networks"

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type Test interface {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	Configure(builder *TestConfigurationBuilder)

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	Setup(networkCtx *networks.NetworkContext) (networks.Network, error)

	// NOTE: if Go had generics, 'network' would be a parameterized type representing the network that this test consumes
	// as produced by the NetworkLoader
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	Run(network networks.Network) error
}
