/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

package testsuite

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type TestSuite interface {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	GetTests() map[string]Test
}
