import * as grpc from "grpc";

export class KurtosisTestsuiteApiLibServiceError implements grpc.ServiceError { //
	readonly code?: grpc.status;
	readonly metadata?: grpc.Metadata;
	readonly details?: string;
	readonly name: string;
	readonly message: string;
	readonly stack?: string;
	
	constructor(code: grpc.status, from: Error) {
		this.code = code;
		this.metadata = null;
		this.details = null;
		this.name = from.name;
		this.message = from.message;
		this.stack = from.stack;
	}
}