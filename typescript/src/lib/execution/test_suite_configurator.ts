/*
 * Copyright (c) 2021 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { TestSuite } from "../testsuite/test_suite"; //TODO
import { Result } from "neverthrow";

// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
export interface TestSuiteConfigurator {
	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	setLogLevel(logLevelStr: string): Error;

	// Docs available at https://docs.kurtosistech.com/kurtosis-testsuite-api-lib/lib-documentation
	parseParamsAndCreateSuite(paramsJsonStr: string): Result<TestSuite, Error>
}