# TBD
### Removed
* Removed the `TestSuite.getNetworkWidthBits()` method, as it's no longer necessary given that we're going to hardcode the enclave width

### Breaking Changes
* Removed the `TestSuite.getNetworkWidthBits()` method
    * Users should remove this method from their testsuite
* Upgraded to [Kurtosis Client 0.11.0](https://github.com/kurtosis-tech/kurtosis-client/blob/develop/docs/changelog.md#1110)

# 0.3.0
### Changes
* Use Kurtosis Client to v0.10.0
* Static files are now defined on a per-test level (rather than per-testsuite level), and added a `TestConfigurationBuilder.withStaticFileFilepaths` method for defining a test's usage of static files
* The `CopyStaticFilesToExecutionVolume` testsuite service endpoint has been removed and replaced with the `RegisterFiles`, which now registers both static files AND files artifacts
    * This endpoint will now call down to `NetworkContext.registerStaticFiles` and `NetworkContext.registerFilesArtifacts`

### Breaking Changes
* Removed the `TestSuite.getStaticFiles` endpoint; per-test usage should be defined with `TestConfigurationBuilder.withStaticFileFilepaths`
* The `TestSuiteMetadata` object no longer contains static files
* The `TestMetadata` object no longer contains files artifact URLs
* The `CopyStaticFilesToExecutionVolume` testsuite service endpoint has been removed; the `RegisterFiles` endpoint should be used instead
* Renamed `TestsuiteContainerSuiteExVolMountpoint` -> `EnclaveDataVolumeMountpoint`


# 0.2.0
### Features
* The `TestsuiteExecutor` no longer requires a constructor with Kurtosis API socket, loglevel, and testsuite params args, and instead reads them directly from the environment

### Fixes
* Remove the docs for the now-nonexistent `Test.getSetupTimeout` and `Test.getRunTimeout` methods

### Breaking Changes
* `NewTestsuiteExecutor` no longer reads Kurtosis API socket, loglevel, or serialized testsuite params
    * This means that users can change their Dockerfile `CMD` to simply call their program, with no need to read any environment variables - e.g. `CMD ./testsuite.bin --api-socket ${API_SOCKET} --log-level ${LOG_LEVEL} --custom-params ${CUSTOM_PARAMS}` becomes `CMD ./testsuite.bin`

# 0.1.2
### Changes
* Downgrade to Kurt Client 0.8.1, which doesn't have the Lambda commands in the bulk JSON API yet

# 0.1.1
### Features
* Added `release.sh` script

# 0.1.0
* Init commit
