# TBD

# 0.5.0
### Fixes
* Upgraded to Kurt Client 0.15.0 to fix a typo in ContainerRunConfigBuilder

### Breaking Changes
* Upgrade to Kurt Client 0.15.0 (see break remediation [here](https://github.com/kurtosis-tech/kurtosis-client/blob/develop/docs/changelog.md))

# 0.4.7
### Fixes
* Recover from any panics thrown when a test's setup is executed

# 0.4.6
### Changes
* Updated kurtosis-core-api-lib which cleaned-up some of the code from kurtosis-client

# 0.4.5
### Changes
* Updated kurtosis-core-api-lib which fixed important semantical issues

# 0.4.4
### Changes
* Updated kurtosis-core-api-lib which fixed important semantical issues

# 0.4.3
### Changes
* Updated kurtosis-core-api-lib which fixed important semantical issues
* Updated the implemented methods for KnownKeysOnly<ITestSuiteServiceServer> to callback google_protobuf_empty_pb.Empty when needed

### Fixes
* Don't check docs on develop/master

# 0.4.2
### Changes
* Installed latest version of minimal-grpc-server npm package which fix important bugs to run docker with kurtosis
* Installed kurtosis-core-api-lib npm package which adds new exports that users can access

# 0.4.1
### Changes
* Use the devtools version of package-updating

### Features
* Added typescript build script for compiling all typescript files into a single .js file
* Ported over `kurtosis_testsuite_docker_api` and `kurtosis_testsuite_rpc_api_consts` to typescript
* Added `lib/testsuite` files into typescript
* Added `lib/execution` files to typescript
* Added a Typescript minimal gRPC server inside Typescript `TestsuiteExecutor`, which should be moved to the `minimal-grpc-server` library
* Added a .gitignore file which doesn't add `node_modules` or `build` directories
* Configured CircleCI checks & publishing for Typescript library
* Added Apache-2 licensing
* Switched to using the Kurtosis docs-checker orb rather than a custom docs-checking job
* Use correct `minimal-grpc-server` module
* Added supported-languages.txt

### Fixes
* Replaced references to "Kurtosis Lib" in the changelog with "testsuite API lib"
* Fixed `regenerate-protobuf-bindings` script that got broken when reshuffling Typescript directory hierarchy

# 0.4.0
### Removed
* Removed the `TestSuite.getNetworkWidthBits()` method, as it's no longer necessary given that we're going to hardcode the enclave width

### Breaking Changes
* Removed the `TestSuite.getNetworkWidthBits()` method
    * Users should remove this method from their testsuite
* Upgraded to [Kurtosis Client 0.11.0](https://github.com/kurtosis-tech/kurtosis-client/blob/develop/docs/changelog.md#0110)

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
