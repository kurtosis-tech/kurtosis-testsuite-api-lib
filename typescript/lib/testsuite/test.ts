/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

//import "github.com/kurtosis-tech/kurtosis-client/golang/lib/networks" //TODO TODO TODO - when kurt-client completed
import { Result } from "neverthrow";

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
interface Test {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	configure(TestConfigurationBuilder): void;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	setup(networks.NetworkContext): Result<Networks.Network, Error>; //TODO - Result is the right call?

	// NOTE: if Go had generics, 'network' would be a parameterized type representing the network that this test consumes
	// as produced by the NetworkLoader
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	run(networks.Network): Error;
}
