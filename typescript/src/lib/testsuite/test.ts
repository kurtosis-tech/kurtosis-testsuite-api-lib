/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { Network, NetworkContext } from "kurtosis-core-api-lib";
import { TestConfigurationBuilder } from "./test_configuration_builder";
import { Result } from "neverthrow";

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
export interface Test {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	configure(builder: TestConfigurationBuilder): void;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	setup(networkCtx: NetworkContext): Result<Network, Error>;

	// TODO - 'network' should be a parameterized type representing the network that this test consumes
	// as produced by the NetworkLoader
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	run(network: Network): Error;
}
