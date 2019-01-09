import BinaryReader from './binary-reader.js'
import { object } from './black-readers.js'

export function read(view, constructors = null, defaultConstructor = Object) {
  let reader = new BinaryReader(view)

  if (arguments.length > 1) {
    reader.constructors = constructors
  } else {
    reader.constructors = new Map()
  }

  reader.expectU32(0xB1ACF11E, "wrong FOURCC")
  reader.expectU32(1, "wrong version")

  let stringsReader = reader.readBinaryReader(reader.readU32())
  let stringsCount = stringsReader.readU16()
  let strings = []

  for (let i = 0; i < stringsCount; i++) {
    strings[i] = stringsReader.readCString()
  }

  stringsReader.expectEnd()

  reader.defaultConstructor = defaultConstructor
  reader.references = new Map()
  reader.strings = strings

  let commentReader = reader.readBinaryReader(reader.readU32())
  let comment = commentReader.readCWString()

  commentReader.expectEnd()

  return {
    comment: comment,
    object: object(reader)
  }
}
