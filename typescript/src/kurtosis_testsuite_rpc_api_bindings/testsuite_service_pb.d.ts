// package: test_suite_api
// file: testsuite_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class TestSuiteMetadata extends jspb.Message {
  getTestMetadataMap(): jspb.Map<string, TestMetadata>;
  clearTestMetadataMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestSuiteMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: TestSuiteMetadata): TestSuiteMetadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestSuiteMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestSuiteMetadata;
  static deserializeBinaryFromReader(message: TestSuiteMetadata, reader: jspb.BinaryReader): TestSuiteMetadata;
}

export namespace TestSuiteMetadata {
  export type AsObject = {
    testMetadataMap: Array<[string, TestMetadata.AsObject]>,
  }
}

export class TestMetadata extends jspb.Message {
  getIsPartitioningEnabled(): boolean;
  setIsPartitioningEnabled(value: boolean): void;

  getTestSetupTimeoutInSeconds(): number;
  setTestSetupTimeoutInSeconds(value: number): void;

  getTestRunTimeoutInSeconds(): number;
  setTestRunTimeoutInSeconds(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TestMetadata.AsObject;
  static toObject(includeInstance: boolean, msg: TestMetadata): TestMetadata.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TestMetadata, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TestMetadata;
  static deserializeBinaryFromReader(message: TestMetadata, reader: jspb.BinaryReader): TestMetadata;
}

export namespace TestMetadata {
  export type AsObject = {
    isPartitioningEnabled: boolean,
    testSetupTimeoutInSeconds: number,
    testRunTimeoutInSeconds: number,
  }
}

export class RegisterFilesArtifactsArgs extends jspb.Message {
  getTestName(): string;
  setTestName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterFilesArtifactsArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterFilesArtifactsArgs): RegisterFilesArtifactsArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterFilesArtifactsArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterFilesArtifactsArgs;
  static deserializeBinaryFromReader(message: RegisterFilesArtifactsArgs, reader: jspb.BinaryReader): RegisterFilesArtifactsArgs;
}

export namespace RegisterFilesArtifactsArgs {
  export type AsObject = {
    testName: string,
  }
}

export class SetupTestArgs extends jspb.Message {
  getTestName(): string;
  setTestName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetupTestArgs.AsObject;
  static toObject(includeInstance: boolean, msg: SetupTestArgs): SetupTestArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SetupTestArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetupTestArgs;
  static deserializeBinaryFromReader(message: SetupTestArgs, reader: jspb.BinaryReader): SetupTestArgs;
}

export namespace SetupTestArgs {
  export type AsObject = {
    testName: string,
  }
}

export class RunTestArgs extends jspb.Message {
  getTestName(): string;
  setTestName(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RunTestArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RunTestArgs): RunTestArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RunTestArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RunTestArgs;
  static deserializeBinaryFromReader(message: RunTestArgs, reader: jspb.BinaryReader): RunTestArgs;
}

export namespace RunTestArgs {
  export type AsObject = {
    testName: string,
  }
}

