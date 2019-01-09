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
  return [vector4(reader), vector4(reader), vector4(reader), vector4(reader)]
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
      console.log(propertyName)
      
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

export function uint(reader) {
  return reader.readU32()
}

export function vector3(reader) {
  return [reader.readF32(), reader.readF32(), reader.readF32()]
}

export function vector4(reader) {
  return [reader.readF32(), reader.readF32(), reader.readF32(), reader.readF32()]
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