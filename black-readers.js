import classes from './black-classes.js'

export function array(reader) {
  let count = reader.readU32()
  let result = []
  
  for (let i = 0; i < count; i++) {
    result[i] = object(reader)
  }
  
  return result
}

export function boolean(reader) {
  return reader.readU8() != 0
}

export function color(reader) {
  return [reader.readF32(), reader.readF32(), reader.readF32(), reader.readF32()]
}

export function float(reader) {
  return reader.readF32()
}

export function matrix(reader) {
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

  if (arguments.length == 1) {
    id = reader.readU32()

    if (id == 0) {
      return null
    } else if (context.references.has(id)) {
      return context.references.get(id)
    }
  }

  let objectReader = reader.readBinaryReader(reader.readU32())
  let type = objectReader.readStringU16()

  let result = context.constructType(type)

  if (arguments.length == 1) {
    context.references.set(id, result)
  }

  if (!classes.has(type)) {
    throw `unknown class ${type}`
  }

  let properties = classes.get(type)

  while (!objectReader.atEnd()) {
    let propertyName = objectReader.readStringU16()

    if (properties.has(propertyName)) {
      result[propertyName] = properties.get(propertyName)(objectReader)
    } else {
      throw `unknown property ${propertyName} for ${type}`
    }
  }

  objectReader.expectEnd("object did not read to end?")

  return result
}

export function path(reader) {
  return reader.readStringU16()
}

export function rawObject(reader) {
  return object(reader, null)
}

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