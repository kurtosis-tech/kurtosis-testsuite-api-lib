# TBD
### Changes
* Use Kurtosis Client vTODOOOOOOOOOOOOOOOOOOOo
* Static files are now defined on a per-test level (rather than per-testsuite level), and added a `TestConfigurationBuilder.withStaticFileFilepaths` method for defining a test's usage of static files
* The `CopyStaticFilesToExecutionVolume` testsuite service endpoint has been removed and replaced with the `RegisterFiles`, which now registers both static files AND files artifacts
    * This endpoint will now call down to `NetworkContext.registerStaticFiles` and `NetworkContext.registerFilesArtifacts`

### Fixes
* Remove the docs for the now-nonexistent `Test.getSetupTimeout` and `Test.getRunTimeout` methods

### Breaking Changes
* Removed the `TestSuite.getStaticFiles` endpoint; per-test usage should be defined with `TestConfigurationBuilder.withStaticFileFilepaths`
* The `TestSuiteMetadata` object no longer contains static files
* The `TestMetadata` object no longer contains files artifact URLs
* The `CopyStaticFilesToExecutionVolume` testsuite service endpoint has been removed; the `RegisterFiles` endpoint should be used instead

# 0.1.2
### Changes
* Downgrade to Kurt Client 0.8.1, which doesn't have the Lambda commands in the bulk JSON API yet

# 0.1.1
### Features
* Added `release.sh` script

# 0.1.0
* Init commit
