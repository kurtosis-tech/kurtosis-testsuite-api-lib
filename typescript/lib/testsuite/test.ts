/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

//import { NetworkContext, Network } from "kurtosis-js-lib" //TODO TODO TODO - once kurt-client npm package is published
import { TestConfigurationBuilder } from "./test_configuration_builder";
import { Result } from "neverthrow";

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
export interface Test {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	configure(builder: TestConfigurationBuilder): void;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	setup(networkCtx: networks.NetworkContext): Result<Networks.Network, Error>; //TODO - Result is the right call?

	// NOTE: if Go had generics, 'network' would be a parameterized type representing the network that this test consumes
	// as produced by the NetworkLoader
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	run(network: networks.Network): Error; //TODO - since typescript has generics, do we get rid of the Network interface?
}
