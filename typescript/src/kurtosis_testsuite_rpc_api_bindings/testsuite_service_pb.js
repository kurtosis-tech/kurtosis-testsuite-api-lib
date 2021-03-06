// source: testsuite_service.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
goog.object.extend(proto, google_protobuf_empty_pb);
goog.exportSymbol('proto.test_suite_api.RegisterFilesArtifactsArgs', null, global);
goog.exportSymbol('proto.test_suite_api.RunTestArgs', null, global);
goog.exportSymbol('proto.test_suite_api.SetupTestArgs', null, global);
goog.exportSymbol('proto.test_suite_api.TestMetadata', null, global);
goog.exportSymbol('proto.test_suite_api.TestSuiteMetadata', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.test_suite_api.TestSuiteMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.test_suite_api.TestSuiteMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.test_suite_api.TestSuiteMetadata.displayName = 'proto.test_suite_api.TestSuiteMetadata';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.test_suite_api.TestMetadata = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.test_suite_api.TestMetadata, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.test_suite_api.TestMetadata.displayName = 'proto.test_suite_api.TestMetadata';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.test_suite_api.RegisterFilesArtifactsArgs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.test_suite_api.RegisterFilesArtifactsArgs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.test_suite_api.RegisterFilesArtifactsArgs.displayName = 'proto.test_suite_api.RegisterFilesArtifactsArgs';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.test_suite_api.SetupTestArgs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.test_suite_api.SetupTestArgs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.test_suite_api.SetupTestArgs.displayName = 'proto.test_suite_api.SetupTestArgs';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.test_suite_api.RunTestArgs = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.test_suite_api.RunTestArgs, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.test_suite_api.RunTestArgs.displayName = 'proto.test_suite_api.RunTestArgs';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.test_suite_api.TestSuiteMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.test_suite_api.TestSuiteMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.test_suite_api.TestSuiteMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.TestSuiteMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    testMetadataMap: (f = msg.getTestMetadataMap()) ? f.toObject(includeInstance, proto.test_suite_api.TestMetadata.toObject) : []
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.test_suite_api.TestSuiteMetadata}
 */
proto.test_suite_api.TestSuiteMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.test_suite_api.TestSuiteMetadata;
  return proto.test_suite_api.TestSuiteMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.test_suite_api.TestSuiteMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.test_suite_api.TestSuiteMetadata}
 */
proto.test_suite_api.TestSuiteMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = msg.getTestMetadataMap();
      reader.readMessage(value, function(message, reader) {
        jspb.Map.deserializeBinary(message, reader, jspb.BinaryReader.prototype.readString, jspb.BinaryReader.prototype.readMessage, proto.test_suite_api.TestMetadata.deserializeBinaryFromReader, "", new proto.test_suite_api.TestMetadata());
         });
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.test_suite_api.TestSuiteMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.test_suite_api.TestSuiteMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.test_suite_api.TestSuiteMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.TestSuiteMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTestMetadataMap(true);
  if (f && f.getLength() > 0) {
    f.serializeBinary(1, writer, jspb.BinaryWriter.prototype.writeString, jspb.BinaryWriter.prototype.writeMessage, proto.test_suite_api.TestMetadata.serializeBinaryToWriter);
  }
};


/**
 * map<string, TestMetadata> test_metadata = 1;
 * @param {boolean=} opt_noLazyCreate Do not create the map if
 * empty, instead returning `undefined`
 * @return {!jspb.Map<string,!proto.test_suite_api.TestMetadata>}
 */
proto.test_suite_api.TestSuiteMetadata.prototype.getTestMetadataMap = function(opt_noLazyCreate) {
  return /** @type {!jspb.Map<string,!proto.test_suite_api.TestMetadata>} */ (
      jspb.Message.getMapField(this, 1, opt_noLazyCreate,
      proto.test_suite_api.TestMetadata));
};


/**
 * Clears values from the map. The map will be non-null.
 * @return {!proto.test_suite_api.TestSuiteMetadata} returns this
 */
proto.test_suite_api.TestSuiteMetadata.prototype.clearTestMetadataMap = function() {
  this.getTestMetadataMap().clear();
  return this;};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.test_suite_api.TestMetadata.prototype.toObject = function(opt_includeInstance) {
  return proto.test_suite_api.TestMetadata.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.test_suite_api.TestMetadata} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.TestMetadata.toObject = function(includeInstance, msg) {
  var f, obj = {
    isPartitioningEnabled: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    testSetupTimeoutInSeconds: jspb.Message.getFieldWithDefault(msg, 2, 0),
    testRunTimeoutInSeconds: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.test_suite_api.TestMetadata}
 */
proto.test_suite_api.TestMetadata.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.test_suite_api.TestMetadata;
  return proto.test_suite_api.TestMetadata.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.test_suite_api.TestMetadata} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.test_suite_api.TestMetadata}
 */
proto.test_suite_api.TestMetadata.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsPartitioningEnabled(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTestSetupTimeoutInSeconds(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setTestRunTimeoutInSeconds(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.test_suite_api.TestMetadata.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.test_suite_api.TestMetadata.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.test_suite_api.TestMetadata} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.TestMetadata.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIsPartitioningEnabled();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getTestSetupTimeoutInSeconds();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getTestRunTimeoutInSeconds();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional bool is_partitioning_enabled = 1;
 * @return {boolean}
 */
proto.test_suite_api.TestMetadata.prototype.getIsPartitioningEnabled = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.test_suite_api.TestMetadata} returns this
 */
proto.test_suite_api.TestMetadata.prototype.setIsPartitioningEnabled = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional uint32 test_setup_timeout_in_seconds = 2;
 * @return {number}
 */
proto.test_suite_api.TestMetadata.prototype.getTestSetupTimeoutInSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.test_suite_api.TestMetadata} returns this
 */
proto.test_suite_api.TestMetadata.prototype.setTestSetupTimeoutInSeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 test_run_timeout_in_seconds = 3;
 * @return {number}
 */
proto.test_suite_api.TestMetadata.prototype.getTestRunTimeoutInSeconds = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.test_suite_api.TestMetadata} returns this
 */
proto.test_suite_api.TestMetadata.prototype.setTestRunTimeoutInSeconds = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.prototype.toObject = function(opt_includeInstance) {
  return proto.test_suite_api.RegisterFilesArtifactsArgs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.test_suite_api.RegisterFilesArtifactsArgs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.toObject = function(includeInstance, msg) {
  var f, obj = {
    testName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.test_suite_api.RegisterFilesArtifactsArgs}
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.test_suite_api.RegisterFilesArtifactsArgs;
  return proto.test_suite_api.RegisterFilesArtifactsArgs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.test_suite_api.RegisterFilesArtifactsArgs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.test_suite_api.RegisterFilesArtifactsArgs}
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTestName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.test_suite_api.RegisterFilesArtifactsArgs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.test_suite_api.RegisterFilesArtifactsArgs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTestName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string test_name = 1;
 * @return {string}
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.prototype.getTestName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.test_suite_api.RegisterFilesArtifactsArgs} returns this
 */
proto.test_suite_api.RegisterFilesArtifactsArgs.prototype.setTestName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.test_suite_api.SetupTestArgs.prototype.toObject = function(opt_includeInstance) {
  return proto.test_suite_api.SetupTestArgs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.test_suite_api.SetupTestArgs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.SetupTestArgs.toObject = function(includeInstance, msg) {
  var f, obj = {
    testName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.test_suite_api.SetupTestArgs}
 */
proto.test_suite_api.SetupTestArgs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.test_suite_api.SetupTestArgs;
  return proto.test_suite_api.SetupTestArgs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.test_suite_api.SetupTestArgs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.test_suite_api.SetupTestArgs}
 */
proto.test_suite_api.SetupTestArgs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTestName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.test_suite_api.SetupTestArgs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.test_suite_api.SetupTestArgs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.test_suite_api.SetupTestArgs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.SetupTestArgs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTestName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string test_name = 1;
 * @return {string}
 */
proto.test_suite_api.SetupTestArgs.prototype.getTestName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.test_suite_api.SetupTestArgs} returns this
 */
proto.test_suite_api.SetupTestArgs.prototype.setTestName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.test_suite_api.RunTestArgs.prototype.toObject = function(opt_includeInstance) {
  return proto.test_suite_api.RunTestArgs.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.test_suite_api.RunTestArgs} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.RunTestArgs.toObject = function(includeInstance, msg) {
  var f, obj = {
    testName: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.test_suite_api.RunTestArgs}
 */
proto.test_suite_api.RunTestArgs.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.test_suite_api.RunTestArgs;
  return proto.test_suite_api.RunTestArgs.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.test_suite_api.RunTestArgs} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.test_suite_api.RunTestArgs}
 */
proto.test_suite_api.RunTestArgs.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTestName(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.test_suite_api.RunTestArgs.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.test_suite_api.RunTestArgs.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.test_suite_api.RunTestArgs} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.test_suite_api.RunTestArgs.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTestName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string test_name = 1;
 * @return {string}
 */
proto.test_suite_api.RunTestArgs.prototype.getTestName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.test_suite_api.RunTestArgs} returns this
 */
proto.test_suite_api.RunTestArgs.prototype.setTestName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


goog.object.extend(exports, proto.test_suite_api);
