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

function serialize_test_suite_api_CopyStaticFilesToExecutionVolumeArgs(arg) {
  if (!(arg instanceof testsuite_service_pb.CopyStaticFilesToExecutionVolumeArgs)) {
    throw new Error('Expected argument of type test_suite_api.CopyStaticFilesToExecutionVolumeArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_test_suite_api_CopyStaticFilesToExecutionVolumeArgs(buffer_arg) {
  return testsuite_service_pb.CopyStaticFilesToExecutionVolumeArgs.deserializeBinary(new Uint8Array(buffer_arg));
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
  // Endpoint to verify the gRPC server is actually up before making any real calls
isAvailable: {
    path: '/test_suite_api.TestSuiteService/IsAvailable',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
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
  // Will be called by Kurtosis itself, telling the testsuite container to copy static files contained in the testsuite 
//  to the suite execution volume so that API containers can use them when starting services
copyStaticFilesToExecutionVolume: {
    path: '/test_suite_api.TestSuiteService/CopyStaticFilesToExecutionVolume',
    requestStream: false,
    responseStream: false,
    requestType: testsuite_service_pb.CopyStaticFilesToExecutionVolumeArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_test_suite_api_CopyStaticFilesToExecutionVolumeArgs,
    requestDeserialize: deserialize_test_suite_api_CopyStaticFilesToExecutionVolumeArgs,
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
  // We don't need args dictating what test to run because SetupTest already indicates it (and it wouldn't make
//  sense to setup one test and run another)
runTest: {
    path: '/test_suite_api.TestSuiteService/RunTest',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.TestSuiteServiceClient = grpc.makeGenericClientConstructor(TestSuiteServiceService);
