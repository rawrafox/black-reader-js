import BinaryReader from "./binary-reader.js"
import {object} from "./black-readers.js"

export class Context {
  constructor(constructors, defaultConstructor = Object) {
    this.constructors = constructors
    this.defaultConstructor = defaultConstructor

    this.references = new Map()
  }

  constructType(type) {
    if (this.constructors.has(type)) {
      return new this.constructors.get(type)()
    } else {
      let result = new this.defaultConstructor()
      result._type = type
      return result
    }
  }
}

export function read(view, context) {
  let reader = new BinaryReader(view, context)

  reader.expectU32(0xB1ACF11E, "wrong FOURCC")
  reader.expectU32(1, "wrong version")

  let stringsReader = reader.readBinaryReader(reader.readU32())
  let stringsCount = stringsReader.readU16()
  let strings = []

  for (let i = 0; i < stringsCount; i++) {
    strings[i] = stringsReader.readCString()
  }

  stringsReader.expectEnd()
  reader.strings = strings

  let commentReader = reader.readBinaryReader(reader.readU32())
  let commentCount = commentReader.readU16()
  let comments = []

  for (let i = 0; i < commentCount; i++) {
    comments[i] = commentReader.readCWString()
  }

  commentReader.expectEnd()

  return {
    comments: comments,
    object: object(reader)
  }
}
