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

// With Callbacks

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