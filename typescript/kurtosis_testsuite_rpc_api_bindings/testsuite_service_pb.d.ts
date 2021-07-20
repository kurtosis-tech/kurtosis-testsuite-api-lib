// package: test_suite_api
// file: testsuite_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class TestSuiteMetadata extends jspb.Message {
  getTestMetadataMap(): jspb.Map<string, TestMetadata>;
  clearTestMetadataMap(): void;
  getNetworkWidthBits(): number;
  setNetworkWidthBits(value: number): void;

  getStaticFilesMap(): jspb.Map<string, boolean>;
  clearStaticFilesMap(): void;
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
    networkWidthBits: number,
    staticFilesMap: Array<[string, boolean]>,
  }
}

export class TestMetadata extends jspb.Message {
  getIsPartitioningEnabled(): boolean;
  setIsPartitioningEnabled(value: boolean): void;

  getUsedArtifactUrlsMap(): jspb.Map<string, boolean>;
  clearUsedArtifactUrlsMap(): void;
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
    usedArtifactUrlsMap: Array<[string, boolean]>,
    testSetupTimeoutInSeconds: number,
    testRunTimeoutInSeconds: number,
  }
}

export class CopyStaticFilesToExecutionVolumeArgs extends jspb.Message {
  getStaticFileDestRelativeFilepathsMap(): jspb.Map<string, string>;
  clearStaticFileDestRelativeFilepathsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CopyStaticFilesToExecutionVolumeArgs.AsObject;
  static toObject(includeInstance: boolean, msg: CopyStaticFilesToExecutionVolumeArgs): CopyStaticFilesToExecutionVolumeArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CopyStaticFilesToExecutionVolumeArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CopyStaticFilesToExecutionVolumeArgs;
  static deserializeBinaryFromReader(message: CopyStaticFilesToExecutionVolumeArgs, reader: jspb.BinaryReader): CopyStaticFilesToExecutionVolumeArgs;
}

export namespace CopyStaticFilesToExecutionVolumeArgs {
  export type AsObject = {
    staticFileDestRelativeFilepathsMap: Array<[string, string]>,
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

