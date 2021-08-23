// ====================================== NOTE ========================================================= 
// All this rigamarole is necessary due to gRPC's stupid "unimplemented server" requirements
// See:
// - https://github.com/agreatfool/grpc_tools_node_protoc_ts/issues/79
// - https://github.com/agreatfool/grpc_tools_node_protoc_ts/blob/master/doc/server_impl_signature.md
//
// ====================================== NOTE =========================================================
export type KnownKeys<T> = {
    [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;

export type KnownKeysOnly<T extends Record<any, any>> = Pick<T, KnownKeys<T>>;