# TBD

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
