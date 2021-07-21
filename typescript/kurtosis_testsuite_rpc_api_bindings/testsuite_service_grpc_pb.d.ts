// GENERATED CODE -- DO NOT EDIT!

// package: test_suite_api
// file: testsuite_service.proto

import * as testsuite_service_pb from "./testsuite_service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";

interface ITestSuiteServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  isAvailable: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
  getTestSuiteMetadata: grpc.MethodDefinition<google_protobuf_empty_pb.Empty, testsuite_service_pb.TestSuiteMetadata>;
  registerFiles: grpc.MethodDefinition<testsuite_service_pb.RegisterFilesArgs, google_protobuf_empty_pb.Empty>;
  setupTest: grpc.MethodDefinition<testsuite_service_pb.SetupTestArgs, google_protobuf_empty_pb.Empty>;
  runTest: grpc.MethodDefinition<testsuite_service_pb.RunTestArgs, google_protobuf_empty_pb.Empty>;
}

export const TestSuiteServiceService: ITestSuiteServiceService;

export interface ITestSuiteServiceServer extends grpc.UntypedServiceImplementation {
  isAvailable: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, google_protobuf_empty_pb.Empty>;
  getTestSuiteMetadata: grpc.handleUnaryCall<google_protobuf_empty_pb.Empty, testsuite_service_pb.TestSuiteMetadata>;
  registerFiles: grpc.handleUnaryCall<testsuite_service_pb.RegisterFilesArgs, google_protobuf_empty_pb.Empty>;
  setupTest: grpc.handleUnaryCall<testsuite_service_pb.SetupTestArgs, google_protobuf_empty_pb.Empty>;
  runTest: grpc.handleUnaryCall<testsuite_service_pb.RunTestArgs, google_protobuf_empty_pb.Empty>;
}

export class TestSuiteServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  isAvailable(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  isAvailable(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  isAvailable(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  getTestSuiteMetadata(argument: google_protobuf_empty_pb.Empty, callback: grpc.requestCallback<testsuite_service_pb.TestSuiteMetadata>): grpc.ClientUnaryCall;
  getTestSuiteMetadata(argument: google_protobuf_empty_pb.Empty, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<testsuite_service_pb.TestSuiteMetadata>): grpc.ClientUnaryCall;
  getTestSuiteMetadata(argument: google_protobuf_empty_pb.Empty, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<testsuite_service_pb.TestSuiteMetadata>): grpc.ClientUnaryCall;
  registerFiles(argument: testsuite_service_pb.RegisterFilesArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  registerFiles(argument: testsuite_service_pb.RegisterFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  registerFiles(argument: testsuite_service_pb.RegisterFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  setupTest(argument: testsuite_service_pb.SetupTestArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  setupTest(argument: testsuite_service_pb.SetupTestArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  setupTest(argument: testsuite_service_pb.SetupTestArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  runTest(argument: testsuite_service_pb.RunTestArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  runTest(argument: testsuite_service_pb.RunTestArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  runTest(argument: testsuite_service_pb.RunTestArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
}
