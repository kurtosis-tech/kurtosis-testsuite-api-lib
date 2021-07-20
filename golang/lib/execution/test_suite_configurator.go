/*
 * Copyright (c) 2021 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

package execution

import "github.com/kurtosis-tech/kurtosis-testsuite-api-lib/golang/lib/testsuite"

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
type TestSuiteConfigurator interface {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	SetLogLevel(logLevelStr string) error

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	ParseParamsAndCreateSuite(paramsJsonStr string) (testsuite.TestSuite, error)
}
