import classes from './black-classes.js'

export const idSymbol = Symbol('id')

function addBinaryReaderDebugInformation(object, reader) {
  object.offset = reader.offset
  object.remainingLength = reader.length
  object.fileOffsetBuffer = reader.view.byteOffset - reader.fileStart
  object.fileOffsetCurrent = object.fileOffsetBuffer + object.offset

  if (reader.length >= 1) {
    object.u8 = reader.copy().readU8()
  }

  if (reader.length >= 2) {
    object.u16 = reader.copy().readU16()

    try {
      object.stringU16 = reader.copy().readStringU16()
    } catch {}
  }

  if (reader.length >= 4) {
    object.u32 = reader.copy().readU32()
    object.f32 = reader.copy().readF32()
  }

  object.data = reader.copy().readU8Array(Math.min(reader.length, 64))
  object.view = reader.view
}

class PropertyDataError extends Error {
  constructor(type, propertyName, objectReader, error) {
    super(error.message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PropertyDataError);
    }

    this.name = "PropertyDataError"
    this.type = type
    this.propertyName = propertyName
    this.error = error

    addBinaryReaderDebugInformation(this, objectReader)
  }
}

class UnknownClassError extends Error {
  constructor(type) {
    super(type)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownClassError);
    }

    this.name = "UnknownClassError"
    this.type = type
  }
}

class UnknownPropertyError extends Error {
  constructor(type, propertyName, objectReader) {
    super(`"${propertyName}" for ${type}`)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnknownPropertyError);
    }

    this.name = "UnknownPropertyError"
    this.type = type
    this.propertyName = propertyName

    addBinaryReaderDebugInformation(this, objectReader)
  }
}

export function array(reader) {
  let count = reader.readU32()
  let result = []

  let debugContext = reader.debugContext
  debugContext.group(`Array(count: ${count})`)

  for (let i = 0; i < count; i++) {
    result[i] = object(reader)
  }

  debugContext.groupEnd()

  return result
}

array.complexReader = true

export function boolean(reader) {
  return reader.readU8() != 0
}

export function byte(reader) {
  return reader.readU8()
}

export function float(reader) {
  return reader.readF32()
}

export function matrix4(reader) {
  var buffer = new ArrayBuffer(64)

  return [
    vector4(reader, new Float32Array(buffer, 0, 4)),
    vector4(reader, new Float32Array(buffer, 16, 4)),
    vector4(reader, new Float32Array(buffer, 32, 4)),
    vector4(reader, new Float32Array(buffer, 48, 4))
  ]
}

export function object(reader, id = null) {
  let context = reader.context
  let debugContext = reader.debugContext

  if (arguments.length == 1) {
    id = reader.readU32()

    if (id == 0) {
      return null
    } else if (reader.references.has(id)) {
      return reader.references.get(id)
    }
  }

  let length = reader.readU32()
  let objectReader = reader.readBinaryReader(length)
  let type = objectReader.readStringU16()

  debugContext.group(`object ${type}(id: ${id}, length: ${length})`)

  let result = context.constructType(type)

  result[idSymbol] = id

  if (arguments.length == 1) {
    reader.references.set(id, result)
  }

  if (!classes.has(type)) {
    throw new UnknownClassError(type)
  }

  let properties = classes.get(type)

  while (!objectReader.atEnd()) {
    let propertyName = objectReader.readStringU16()

    if (properties.has(propertyName)) {
      try {

        let propertyReader = properties.get(propertyName)

        if (propertyReader.complexReader) {
          debugContext.group(propertyName)
        }

        let value = propertyReader(objectReader)

        if (result instanceof Map) {
          result.set(propertyName, value)
        } else {
          result[propertyName] = value
        }

        if (propertyReader.complexReader) {
          debugContext.groupEnd()
        } else {
          debugContext.property(propertyName, value)
        }
      } catch (e) {
        //throw e;
        if (e instanceof UnknownPropertyError) {
          throw e
        } else {
          throw new PropertyDataError(type, propertyName, objectReader, e)
        }
      }
    } else {
      throw new UnknownPropertyError(type, propertyName, objectReader)
    }
  }

  objectReader.expectEnd("object did not read to end?")

  debugContext.groupEnd()

  return result
}

object.complexReader = true

export function path(reader) {
  let value = reader.readStringU16()
  if (typeof reader.context.pathHandler == "function")
  {
    value = reader.context.pathHandler(value)
  }
  return value
}

export function rawObject(reader) {
  return object(reader, null)
}

rawObject.complexReader = true

export function string(reader) {
  return reader.readStringU16()
}

export function ushort(reader) {
  return reader.readU16()
}

export function uint(reader) {
  return reader.readU32()
}

export function vector2(reader, result = new Float32Array(2)) {
  result[0] = reader.readF32()
  result[1] = reader.readF32()
  return result
}

export function vector3(reader, result = new Float32Array(3)) {
  result[0] = reader.readF32()
  result[1] = reader.readF32()
  result[2] = reader.readF32()
  return result
}

export function vector4(reader, result = new Float32Array(4)) {
  result[0] = reader.readF32()
  result[1] = reader.readF32()
  result[2] = reader.readF32()
  result[3] = reader.readF32()
  return result
}

export function color(reader, result = new Float32Array(4)) {
  result[0] = reader.readF32()
  result[1] = reader.readF32()
  result[2] = reader.readF32()
  result[3] = reader.readF32()
  if (typeof reader.context.color == "function") {
    return reader.context.color(result)
  }
  return result;
}

export function quaternion(reader, result = new Float32Array(4)) {
  result[0] = reader.readF32()
  result[1] = reader.readF32()
  result[2] = reader.readF32()
  result[3] = reader.readF32()
  if (typeof reader.context.quaternion == "function") {
    return reader.context.quaternion(result);
  }
  return result;
}

// Complicated

export function indexBuffer(reader) {
  let count = reader.readU32()
  let byteSize = reader.readU16()

  if (byteSize == 4) {
    return reader.readU32Array(count)
  } else {
    throw "unsupported for now"
  }
}

export function struct(struct) {
  return function(reader) {
    return struct.readStruct(reader)
  }
}

export function structList(struct) {
  return function(reader) {
    let count = reader.readU32()
    let byteSize = reader.readU16()
    let result = []

    for (let i = 0; i < count; i++) {
      let structReader = reader.readBinaryReader(byteSize)
      result[i] = struct.readStruct(structReader)
      structReader.expectEnd("struct read to end")
    }

    return result
  }
}
