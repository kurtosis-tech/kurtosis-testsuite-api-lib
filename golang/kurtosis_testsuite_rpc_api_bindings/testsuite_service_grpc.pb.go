// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package kurtosis_testsuite_rpc_api_bindings

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
	emptypb "google.golang.org/protobuf/types/known/emptypb"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// TestSuiteServiceClient is the client API for TestSuiteService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type TestSuiteServiceClient interface {
	// Endpoint to verify the gRPC server is actually up before making any real calls
	IsAvailable(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*emptypb.Empty, error)
	GetTestSuiteMetadata(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*TestSuiteMetadata, error)
	// Will be called by the test initializer container, telling the testsuite container to register static files & files artifacts
	//  so that they're available in the API container before the tests start running
	RegisterFiles(ctx context.Context, in *RegisterFilesArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
	SetupTest(ctx context.Context, in *SetupTestArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
	RunTest(ctx context.Context, in *RunTestArgs, opts ...grpc.CallOption) (*emptypb.Empty, error)
}

type testSuiteServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewTestSuiteServiceClient(cc grpc.ClientConnInterface) TestSuiteServiceClient {
	return &testSuiteServiceClient{cc}
}

func (c *testSuiteServiceClient) IsAvailable(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/test_suite_api.TestSuiteService/IsAvailable", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *testSuiteServiceClient) GetTestSuiteMetadata(ctx context.Context, in *emptypb.Empty, opts ...grpc.CallOption) (*TestSuiteMetadata, error) {
	out := new(TestSuiteMetadata)
	err := c.cc.Invoke(ctx, "/test_suite_api.TestSuiteService/GetTestSuiteMetadata", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *testSuiteServiceClient) RegisterFiles(ctx context.Context, in *RegisterFilesArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/test_suite_api.TestSuiteService/RegisterFiles", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *testSuiteServiceClient) SetupTest(ctx context.Context, in *SetupTestArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/test_suite_api.TestSuiteService/SetupTest", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *testSuiteServiceClient) RunTest(ctx context.Context, in *RunTestArgs, opts ...grpc.CallOption) (*emptypb.Empty, error) {
	out := new(emptypb.Empty)
	err := c.cc.Invoke(ctx, "/test_suite_api.TestSuiteService/RunTest", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// TestSuiteServiceServer is the server API for TestSuiteService service.
// All implementations must embed UnimplementedTestSuiteServiceServer
// for forward compatibility
type TestSuiteServiceServer interface {
	// Endpoint to verify the gRPC server is actually up before making any real calls
	IsAvailable(context.Context, *emptypb.Empty) (*emptypb.Empty, error)
	GetTestSuiteMetadata(context.Context, *emptypb.Empty) (*TestSuiteMetadata, error)
	// Will be called by the test initializer container, telling the testsuite container to register static files & files artifacts
	//  so that they're available in the API container before the tests start running
	RegisterFiles(context.Context, *RegisterFilesArgs) (*emptypb.Empty, error)
	SetupTest(context.Context, *SetupTestArgs) (*emptypb.Empty, error)
	RunTest(context.Context, *RunTestArgs) (*emptypb.Empty, error)
	mustEmbedUnimplementedTestSuiteServiceServer()
}

// UnimplementedTestSuiteServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTestSuiteServiceServer struct {
}

func (UnimplementedTestSuiteServiceServer) IsAvailable(context.Context, *emptypb.Empty) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method IsAvailable not implemented")
}
func (UnimplementedTestSuiteServiceServer) GetTestSuiteMetadata(context.Context, *emptypb.Empty) (*TestSuiteMetadata, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetTestSuiteMetadata not implemented")
}
func (UnimplementedTestSuiteServiceServer) RegisterFiles(context.Context, *RegisterFilesArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RegisterFiles not implemented")
}
func (UnimplementedTestSuiteServiceServer) SetupTest(context.Context, *SetupTestArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method SetupTest not implemented")
}
func (UnimplementedTestSuiteServiceServer) RunTest(context.Context, *RunTestArgs) (*emptypb.Empty, error) {
	return nil, status.Errorf(codes.Unimplemented, "method RunTest not implemented")
}
func (UnimplementedTestSuiteServiceServer) mustEmbedUnimplementedTestSuiteServiceServer() {}

// UnsafeTestSuiteServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to TestSuiteServiceServer will
// result in compilation errors.
type UnsafeTestSuiteServiceServer interface {
	mustEmbedUnimplementedTestSuiteServiceServer()
}

func RegisterTestSuiteServiceServer(s grpc.ServiceRegistrar, srv TestSuiteServiceServer) {
	s.RegisterService(&TestSuiteService_ServiceDesc, srv)
}

func _TestSuiteService_IsAvailable_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TestSuiteServiceServer).IsAvailable(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/test_suite_api.TestSuiteService/IsAvailable",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TestSuiteServiceServer).IsAvailable(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _TestSuiteService_GetTestSuiteMetadata_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(emptypb.Empty)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TestSuiteServiceServer).GetTestSuiteMetadata(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/test_suite_api.TestSuiteService/GetTestSuiteMetadata",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TestSuiteServiceServer).GetTestSuiteMetadata(ctx, req.(*emptypb.Empty))
	}
	return interceptor(ctx, in, info, handler)
}

func _TestSuiteService_RegisterFiles_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RegisterFilesArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TestSuiteServiceServer).RegisterFiles(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/test_suite_api.TestSuiteService/RegisterFiles",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TestSuiteServiceServer).RegisterFiles(ctx, req.(*RegisterFilesArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _TestSuiteService_SetupTest_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetupTestArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TestSuiteServiceServer).SetupTest(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/test_suite_api.TestSuiteService/SetupTest",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TestSuiteServiceServer).SetupTest(ctx, req.(*SetupTestArgs))
	}
	return interceptor(ctx, in, info, handler)
}

func _TestSuiteService_RunTest_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(RunTestArgs)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(TestSuiteServiceServer).RunTest(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/test_suite_api.TestSuiteService/RunTest",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(TestSuiteServiceServer).RunTest(ctx, req.(*RunTestArgs))
	}
	return interceptor(ctx, in, info, handler)
}

// TestSuiteService_ServiceDesc is the grpc.ServiceDesc for TestSuiteService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var TestSuiteService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "test_suite_api.TestSuiteService",
	HandlerType: (*TestSuiteServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "IsAvailable",
			Handler:    _TestSuiteService_IsAvailable_Handler,
		},
		{
			MethodName: "GetTestSuiteMetadata",
			Handler:    _TestSuiteService_GetTestSuiteMetadata_Handler,
		},
		{
			MethodName: "RegisterFiles",
			Handler:    _TestSuiteService_RegisterFiles_Handler,
		},
		{
			MethodName: "SetupTest",
			Handler:    _TestSuiteService_SetupTest_Handler,
		},
		{
			MethodName: "RunTest",
			Handler:    _TestSuiteService_RunTest_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "testsuite_service.proto",
}
