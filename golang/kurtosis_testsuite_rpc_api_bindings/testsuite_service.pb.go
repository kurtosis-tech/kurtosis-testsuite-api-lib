// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.17.3
// source: testsuite_service.proto

package kurtosis_testsuite_rpc_api_bindings

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

// ====================================================================================================
//                                       GetTestSuiteMetadata
// ====================================================================================================
type TestSuiteMetadata struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Mapping of testName -> testMetadata
	TestMetadata map[string]*TestMetadata `protobuf:"bytes,1,rep,name=test_metadata,json=testMetadata,proto3" json:"test_metadata,omitempty" protobuf_key:"bytes,1,opt,name=key,proto3" protobuf_val:"bytes,2,opt,name=value,proto3"`
}

func (x *TestSuiteMetadata) Reset() {
	*x = TestSuiteMetadata{}
	if protoimpl.UnsafeEnabled {
		mi := &file_testsuite_service_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TestSuiteMetadata) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TestSuiteMetadata) ProtoMessage() {}

func (x *TestSuiteMetadata) ProtoReflect() protoreflect.Message {
	mi := &file_testsuite_service_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TestSuiteMetadata.ProtoReflect.Descriptor instead.
func (*TestSuiteMetadata) Descriptor() ([]byte, []int) {
	return file_testsuite_service_proto_rawDescGZIP(), []int{0}
}

func (x *TestSuiteMetadata) GetTestMetadata() map[string]*TestMetadata {
	if x != nil {
		return x.TestMetadata
	}
	return nil
}

type TestMetadata struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	IsPartitioningEnabled     bool   `protobuf:"varint,1,opt,name=is_partitioning_enabled,json=isPartitioningEnabled,proto3" json:"is_partitioning_enabled,omitempty"`
	TestSetupTimeoutInSeconds uint32 `protobuf:"varint,2,opt,name=test_setup_timeout_in_seconds,json=testSetupTimeoutInSeconds,proto3" json:"test_setup_timeout_in_seconds,omitempty"`
	TestRunTimeoutInSeconds   uint32 `protobuf:"varint,3,opt,name=test_run_timeout_in_seconds,json=testRunTimeoutInSeconds,proto3" json:"test_run_timeout_in_seconds,omitempty"`
}

func (x *TestMetadata) Reset() {
	*x = TestMetadata{}
	if protoimpl.UnsafeEnabled {
		mi := &file_testsuite_service_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *TestMetadata) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*TestMetadata) ProtoMessage() {}

func (x *TestMetadata) ProtoReflect() protoreflect.Message {
	mi := &file_testsuite_service_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use TestMetadata.ProtoReflect.Descriptor instead.
func (*TestMetadata) Descriptor() ([]byte, []int) {
	return file_testsuite_service_proto_rawDescGZIP(), []int{1}
}

func (x *TestMetadata) GetIsPartitioningEnabled() bool {
	if x != nil {
		return x.IsPartitioningEnabled
	}
	return false
}

func (x *TestMetadata) GetTestSetupTimeoutInSeconds() uint32 {
	if x != nil {
		return x.TestSetupTimeoutInSeconds
	}
	return 0
}

func (x *TestMetadata) GetTestRunTimeoutInSeconds() uint32 {
	if x != nil {
		return x.TestRunTimeoutInSeconds
	}
	return 0
}

// ====================================================================================================
//                                      Register Files Artifacts
// ====================================================================================================
type RegisterFilesArtifactsArgs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	TestName string `protobuf:"bytes,1,opt,name=test_name,json=testName,proto3" json:"test_name,omitempty"`
}

func (x *RegisterFilesArtifactsArgs) Reset() {
	*x = RegisterFilesArtifactsArgs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_testsuite_service_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RegisterFilesArtifactsArgs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RegisterFilesArtifactsArgs) ProtoMessage() {}

func (x *RegisterFilesArtifactsArgs) ProtoReflect() protoreflect.Message {
	mi := &file_testsuite_service_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RegisterFilesArtifactsArgs.ProtoReflect.Descriptor instead.
func (*RegisterFilesArtifactsArgs) Descriptor() ([]byte, []int) {
	return file_testsuite_service_proto_rawDescGZIP(), []int{2}
}

func (x *RegisterFilesArtifactsArgs) GetTestName() string {
	if x != nil {
		return x.TestName
	}
	return ""
}

// ====================================================================================================
//                                             Setup Test
// ====================================================================================================
type SetupTestArgs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	TestName string `protobuf:"bytes,1,opt,name=test_name,json=testName,proto3" json:"test_name,omitempty"`
}

func (x *SetupTestArgs) Reset() {
	*x = SetupTestArgs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_testsuite_service_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SetupTestArgs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SetupTestArgs) ProtoMessage() {}

func (x *SetupTestArgs) ProtoReflect() protoreflect.Message {
	mi := &file_testsuite_service_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SetupTestArgs.ProtoReflect.Descriptor instead.
func (*SetupTestArgs) Descriptor() ([]byte, []int) {
	return file_testsuite_service_proto_rawDescGZIP(), []int{3}
}

func (x *SetupTestArgs) GetTestName() string {
	if x != nil {
		return x.TestName
	}
	return ""
}

// ====================================================================================================
//                                              Run Test
// ====================================================================================================
type RunTestArgs struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	TestName string `protobuf:"bytes,1,opt,name=test_name,json=testName,proto3" json:"test_name,omitempty"`
}

func (x *RunTestArgs) Reset() {
	*x = RunTestArgs{}
	if protoimpl.UnsafeEnabled {
		mi := &file_testsuite_service_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RunTestArgs) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RunTestArgs) ProtoMessage() {}

func (x *RunTestArgs) ProtoReflect() protoreflect.Message {
	mi := &file_testsuite_service_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RunTestArgs.ProtoReflect.Descriptor instead.
func (*RunTestArgs) Descriptor() ([]byte, []int) {
	return file_testsuite_service_proto_rawDescGZIP(), []int{4}
}

func (x *RunTestArgs) GetTestName() string {
	if x != nil {
		return x.TestName
	}
	return ""
}

var File_testsuite_service_proto protoreflect.FileDescriptor

var file_testsuite_service_proto_rawDesc = []byte{
	0x0a, 0x17, 0x74, 0x65, 0x73, 0x74, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x73, 0x65, 0x72, 0x76,
	0x69, 0x63, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0e, 0x74, 0x65, 0x73, 0x74, 0x5f,
	0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69, 0x1a, 0x1b, 0x67, 0x6f, 0x6f, 0x67, 0x6c,
	0x65, 0x2f, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2f, 0x65, 0x6d, 0x70, 0x74, 0x79,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0xcc, 0x01, 0x0a, 0x11, 0x54, 0x65, 0x73, 0x74, 0x53,
	0x75, 0x69, 0x74, 0x65, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x12, 0x58, 0x0a, 0x0d,
	0x74, 0x65, 0x73, 0x74, 0x5f, 0x6d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x18, 0x01, 0x20,
	0x03, 0x28, 0x0b, 0x32, 0x33, 0x2e, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x73, 0x75, 0x69, 0x74, 0x65,
	0x5f, 0x61, 0x70, 0x69, 0x2e, 0x54, 0x65, 0x73, 0x74, 0x53, 0x75, 0x69, 0x74, 0x65, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x2e, 0x54, 0x65, 0x73, 0x74, 0x4d, 0x65, 0x74, 0x61, 0x64,
	0x61, 0x74, 0x61, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x52, 0x0c, 0x74, 0x65, 0x73, 0x74, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x1a, 0x5d, 0x0a, 0x11, 0x54, 0x65, 0x73, 0x74, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x45, 0x6e, 0x74, 0x72, 0x79, 0x12, 0x10, 0x0a, 0x03, 0x6b,
	0x65, 0x79, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x12, 0x32, 0x0a,
	0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20, 0x01, 0x28, 0x0b, 0x32, 0x1c, 0x2e, 0x74,
	0x65, 0x73, 0x74, 0x5f, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x54, 0x65,
	0x73, 0x74, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x52, 0x05, 0x76, 0x61, 0x6c, 0x75,
	0x65, 0x3a, 0x02, 0x38, 0x01, 0x22, 0xc6, 0x01, 0x0a, 0x0c, 0x54, 0x65, 0x73, 0x74, 0x4d, 0x65,
	0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x12, 0x36, 0x0a, 0x17, 0x69, 0x73, 0x5f, 0x70, 0x61, 0x72,
	0x74, 0x69, 0x74, 0x69, 0x6f, 0x6e, 0x69, 0x6e, 0x67, 0x5f, 0x65, 0x6e, 0x61, 0x62, 0x6c, 0x65,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x08, 0x52, 0x15, 0x69, 0x73, 0x50, 0x61, 0x72, 0x74, 0x69,
	0x74, 0x69, 0x6f, 0x6e, 0x69, 0x6e, 0x67, 0x45, 0x6e, 0x61, 0x62, 0x6c, 0x65, 0x64, 0x12, 0x40,
	0x0a, 0x1d, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x73, 0x65, 0x74, 0x75, 0x70, 0x5f, 0x74, 0x69, 0x6d,
	0x65, 0x6f, 0x75, 0x74, 0x5f, 0x69, 0x6e, 0x5f, 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x73, 0x18,
	0x02, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x19, 0x74, 0x65, 0x73, 0x74, 0x53, 0x65, 0x74, 0x75, 0x70,
	0x54, 0x69, 0x6d, 0x65, 0x6f, 0x75, 0x74, 0x49, 0x6e, 0x53, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x73,
	0x12, 0x3c, 0x0a, 0x1b, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x72, 0x75, 0x6e, 0x5f, 0x74, 0x69, 0x6d,
	0x65, 0x6f, 0x75, 0x74, 0x5f, 0x69, 0x6e, 0x5f, 0x73, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x73, 0x18,
	0x03, 0x20, 0x01, 0x28, 0x0d, 0x52, 0x17, 0x74, 0x65, 0x73, 0x74, 0x52, 0x75, 0x6e, 0x54, 0x69,
	0x6d, 0x65, 0x6f, 0x75, 0x74, 0x49, 0x6e, 0x53, 0x65, 0x63, 0x6f, 0x6e, 0x64, 0x73, 0x22, 0x39,
	0x0a, 0x1a, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x46, 0x69, 0x6c, 0x65, 0x73, 0x41,
	0x72, 0x74, 0x69, 0x66, 0x61, 0x63, 0x74, 0x73, 0x41, 0x72, 0x67, 0x73, 0x12, 0x1b, 0x0a, 0x09,
	0x74, 0x65, 0x73, 0x74, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52,
	0x08, 0x74, 0x65, 0x73, 0x74, 0x4e, 0x61, 0x6d, 0x65, 0x22, 0x2c, 0x0a, 0x0d, 0x53, 0x65, 0x74,
	0x75, 0x70, 0x54, 0x65, 0x73, 0x74, 0x41, 0x72, 0x67, 0x73, 0x12, 0x1b, 0x0a, 0x09, 0x74, 0x65,
	0x73, 0x74, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x74,
	0x65, 0x73, 0x74, 0x4e, 0x61, 0x6d, 0x65, 0x22, 0x2a, 0x0a, 0x0b, 0x52, 0x75, 0x6e, 0x54, 0x65,
	0x73, 0x74, 0x41, 0x72, 0x67, 0x73, 0x12, 0x1b, 0x0a, 0x09, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x6e,
	0x61, 0x6d, 0x65, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x08, 0x74, 0x65, 0x73, 0x74, 0x4e,
	0x61, 0x6d, 0x65, 0x32, 0x90, 0x03, 0x0a, 0x10, 0x54, 0x65, 0x73, 0x74, 0x53, 0x75, 0x69, 0x74,
	0x65, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x3f, 0x0a, 0x0b, 0x49, 0x73, 0x41, 0x76,
	0x61, 0x69, 0x6c, 0x61, 0x62, 0x6c, 0x65, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a,
	0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75,
	0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22, 0x00, 0x12, 0x53, 0x0a, 0x14, 0x47, 0x65, 0x74,
	0x54, 0x65, 0x73, 0x74, 0x53, 0x75, 0x69, 0x74, 0x65, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74,
	0x61, 0x12, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x1a, 0x21, 0x2e, 0x74, 0x65, 0x73, 0x74,
	0x5f, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x54, 0x65, 0x73, 0x74, 0x53,
	0x75, 0x69, 0x74, 0x65, 0x4d, 0x65, 0x74, 0x61, 0x64, 0x61, 0x74, 0x61, 0x22, 0x00, 0x12, 0x5e,
	0x0a, 0x16, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74, 0x65, 0x72, 0x46, 0x69, 0x6c, 0x65, 0x73, 0x41,
	0x72, 0x74, 0x69, 0x66, 0x61, 0x63, 0x74, 0x73, 0x12, 0x2a, 0x2e, 0x74, 0x65, 0x73, 0x74, 0x5f,
	0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x52, 0x65, 0x67, 0x69, 0x73, 0x74,
	0x65, 0x72, 0x46, 0x69, 0x6c, 0x65, 0x73, 0x41, 0x72, 0x74, 0x69, 0x66, 0x61, 0x63, 0x74, 0x73,
	0x41, 0x72, 0x67, 0x73, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72,
	0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70, 0x74, 0x79, 0x22, 0x00, 0x12, 0x44,
	0x0a, 0x09, 0x53, 0x65, 0x74, 0x75, 0x70, 0x54, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x2e, 0x74, 0x65,
	0x73, 0x74, 0x5f, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69, 0x2e, 0x53, 0x65, 0x74,
	0x75, 0x70, 0x54, 0x65, 0x73, 0x74, 0x41, 0x72, 0x67, 0x73, 0x1a, 0x16, 0x2e, 0x67, 0x6f, 0x6f,
	0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45, 0x6d, 0x70,
	0x74, 0x79, 0x22, 0x00, 0x12, 0x40, 0x0a, 0x07, 0x52, 0x75, 0x6e, 0x54, 0x65, 0x73, 0x74, 0x12,
	0x1b, 0x2e, 0x74, 0x65, 0x73, 0x74, 0x5f, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x61, 0x70, 0x69,
	0x2e, 0x52, 0x75, 0x6e, 0x54, 0x65, 0x73, 0x74, 0x41, 0x72, 0x67, 0x73, 0x1a, 0x16, 0x2e, 0x67,
	0x6f, 0x6f, 0x67, 0x6c, 0x65, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x62, 0x75, 0x66, 0x2e, 0x45,
	0x6d, 0x70, 0x74, 0x79, 0x22, 0x00, 0x42, 0x60, 0x5a, 0x5e, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62,
	0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x6b, 0x75, 0x72, 0x74, 0x6f, 0x73, 0x69, 0x73, 0x2d, 0x74, 0x65,
	0x63, 0x68, 0x2f, 0x6b, 0x75, 0x72, 0x74, 0x6f, 0x73, 0x69, 0x73, 0x2d, 0x74, 0x65, 0x73, 0x74,
	0x73, 0x75, 0x69, 0x74, 0x65, 0x2d, 0x61, 0x70, 0x69, 0x2d, 0x6c, 0x69, 0x62, 0x2f, 0x67, 0x6f,
	0x6c, 0x61, 0x6e, 0x67, 0x2f, 0x6b, 0x75, 0x72, 0x74, 0x6f, 0x73, 0x69, 0x73, 0x5f, 0x74, 0x65,
	0x73, 0x74, 0x73, 0x75, 0x69, 0x74, 0x65, 0x5f, 0x72, 0x70, 0x63, 0x5f, 0x61, 0x70, 0x69, 0x5f,
	0x62, 0x69, 0x6e, 0x64, 0x69, 0x6e, 0x67, 0x73, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_testsuite_service_proto_rawDescOnce sync.Once
	file_testsuite_service_proto_rawDescData = file_testsuite_service_proto_rawDesc
)

func file_testsuite_service_proto_rawDescGZIP() []byte {
	file_testsuite_service_proto_rawDescOnce.Do(func() {
		file_testsuite_service_proto_rawDescData = protoimpl.X.CompressGZIP(file_testsuite_service_proto_rawDescData)
	})
	return file_testsuite_service_proto_rawDescData
}

var file_testsuite_service_proto_msgTypes = make([]protoimpl.MessageInfo, 6)
var file_testsuite_service_proto_goTypes = []interface{}{
	(*TestSuiteMetadata)(nil),          // 0: test_suite_api.TestSuiteMetadata
	(*TestMetadata)(nil),               // 1: test_suite_api.TestMetadata
	(*RegisterFilesArtifactsArgs)(nil), // 2: test_suite_api.RegisterFilesArtifactsArgs
	(*SetupTestArgs)(nil),              // 3: test_suite_api.SetupTestArgs
	(*RunTestArgs)(nil),                // 4: test_suite_api.RunTestArgs
	nil,                                // 5: test_suite_api.TestSuiteMetadata.TestMetadataEntry
	(*emptypb.Empty)(nil),              // 6: google.protobuf.Empty
}
var file_testsuite_service_proto_depIdxs = []int32{
	5, // 0: test_suite_api.TestSuiteMetadata.test_metadata:type_name -> test_suite_api.TestSuiteMetadata.TestMetadataEntry
	1, // 1: test_suite_api.TestSuiteMetadata.TestMetadataEntry.value:type_name -> test_suite_api.TestMetadata
	6, // 2: test_suite_api.TestSuiteService.IsAvailable:input_type -> google.protobuf.Empty
	6, // 3: test_suite_api.TestSuiteService.GetTestSuiteMetadata:input_type -> google.protobuf.Empty
	2, // 4: test_suite_api.TestSuiteService.RegisterFilesArtifacts:input_type -> test_suite_api.RegisterFilesArtifactsArgs
	3, // 5: test_suite_api.TestSuiteService.SetupTest:input_type -> test_suite_api.SetupTestArgs
	4, // 6: test_suite_api.TestSuiteService.RunTest:input_type -> test_suite_api.RunTestArgs
	6, // 7: test_suite_api.TestSuiteService.IsAvailable:output_type -> google.protobuf.Empty
	0, // 8: test_suite_api.TestSuiteService.GetTestSuiteMetadata:output_type -> test_suite_api.TestSuiteMetadata
	6, // 9: test_suite_api.TestSuiteService.RegisterFilesArtifacts:output_type -> google.protobuf.Empty
	6, // 10: test_suite_api.TestSuiteService.SetupTest:output_type -> google.protobuf.Empty
	6, // 11: test_suite_api.TestSuiteService.RunTest:output_type -> google.protobuf.Empty
	7, // [7:12] is the sub-list for method output_type
	2, // [2:7] is the sub-list for method input_type
	2, // [2:2] is the sub-list for extension type_name
	2, // [2:2] is the sub-list for extension extendee
	0, // [0:2] is the sub-list for field type_name
}

func init() { file_testsuite_service_proto_init() }
func file_testsuite_service_proto_init() {
	if File_testsuite_service_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_testsuite_service_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TestSuiteMetadata); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_testsuite_service_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*TestMetadata); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_testsuite_service_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RegisterFilesArtifactsArgs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_testsuite_service_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SetupTestArgs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_testsuite_service_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RunTestArgs); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_testsuite_service_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   6,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_testsuite_service_proto_goTypes,
		DependencyIndexes: file_testsuite_service_proto_depIdxs,
		MessageInfos:      file_testsuite_service_proto_msgTypes,
	}.Build()
	File_testsuite_service_proto = out.File
	file_testsuite_service_proto_rawDesc = nil
	file_testsuite_service_proto_goTypes = nil
	file_testsuite_service_proto_depIdxs = nil
}
