// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var testsuite_service_pb = require('./testsuite_service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_test_suite_api_ModuleInfoResponse(arg) {
  if (!(arg instanceof testsuite_service_pb.ModuleInfoResponse)) {
    throw new Error('Expected argument of type test_suite_api.ModuleInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_ModuleInfoResponse(buffer_arg) {
  return testsuite_service_pb.ModuleInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_test_suite_api_RegisterFilesArgs(arg) {
  if (!(arg instanceof testsuite_service_pb.RegisterFilesArgs)) {
    throw new Error('Expected argument of type test_suite_api.RegisterFilesArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_RegisterFilesArgs(buffer_arg) {
  return testsuite_service_pb.RegisterFilesArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_test_suite_api_RunTestArgs(arg) {
  if (!(arg instanceof testsuite_service_pb.RunTestArgs)) {
    throw new Error('Expected argument of type test_suite_api.RunTestArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_RunTestArgs(buffer_arg) {
  return testsuite_service_pb.RunTestArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_test_suite_api_SetupTestArgs(arg) {
  if (!(arg instanceof testsuite_service_pb.SetupTestArgs)) {
    throw new Error('Expected argument of type test_suite_api.SetupTestArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_SetupTestArgs(buffer_arg) {
  return testsuite_service_pb.SetupTestArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_test_suite_api_TestSuiteMetadata(arg) {
  if (!(arg instanceof testsuite_service_pb.TestSuiteMetadata)) {
    throw new Error('Expected argument of type test_suite_api.TestSuiteMetadata');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_TestSuiteMetadata(buffer_arg) {
  return testsuite_service_pb.TestSuiteMetadata.deserializeBinary(new Uint8Array(buffer_arg));
}


var TestSuiteServiceService = exports.TestSuiteServiceService = {
  getModuleInfo: {
    path: '/test_suite_api.TestSuiteService/GetModuleInfo',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: testsuite_service_pb.ModuleInfoResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_test_suite_api_ModuleInfoResponse,
    responseDeserialize: deserialize_test_suite_api_ModuleInfoResponse,
  },
  getTestSuiteMetadata: {
    path: '/test_suite_api.TestSuiteService/GetTestSuiteMetadata',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: testsuite_service_pb.TestSuiteMetadata,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_test_suite_api_TestSuiteMetadata,
    responseDeserialize: deserialize_test_suite_api_TestSuiteMetadata,
  },
  // Will be called by the test initializer container, telling the testsuite container to register static files & files artifacts
//  so that they're available in the API container before the tests start running
registerFiles: {
    path: '/test_suite_api.TestSuiteService/RegisterFiles',
    requestStream: false,
    responseStream: false,
    requestType: testsuite_service_pb.RegisterFilesArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_test_suite_api_RegisterFilesArgs,
    requestDeserialize: deserialize_test_suite_api_RegisterFilesArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  setupTest: {
    path: '/test_suite_api.TestSuiteService/SetupTest',
    requestStream: false,
    responseStream: false,
    requestType: testsuite_service_pb.SetupTestArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_test_suite_api_SetupTestArgs,
    requestDeserialize: deserialize_test_suite_api_SetupTestArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  runTest: {
    path: '/test_suite_api.TestSuiteService/RunTest',
    requestStream: false,
    responseStream: false,
    requestType: testsuite_service_pb.RunTestArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_test_suite_api_RunTestArgs,
    requestDeserialize: deserialize_test_suite_api_RunTestArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.TestSuiteServiceClient = grpc.makeGenericClientConstructor(TestSuiteServiceService);
