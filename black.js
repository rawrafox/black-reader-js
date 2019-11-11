import BinaryReader from './binary-reader.js'
import { object } from './black-readers.js'

export class Context {
  constructor(constructors = new Map(), defaultConstructor = Object) {
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

export class DebugContext {
  constructor(io) {
    this.console = io
  }

  group(message) {
    this.console.group(message)
  }

  groupEnd() {
    this.console.groupEnd()
  }

  log(value) { }

  property(name, value) {
    this.console.log("%s: %s", name, value)
  }
}

export class VerboseDebugContext extends DebugContext {
  log(value, ...args) {
    this.console.log.call(this.console, value, ...args)
  }
}

function nop() {}

const nullDebugContext = {
  group: nop,
  groupEnd: nop,
  log: nop,
  property: nop
}

export function read(view, context, debugContext = nullDebugContext) {
  let reader = new BinaryReader(view, context)

  reader.debugContext = debugContext
  reader.fileStart = view.byteOffset

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

  for (let i = 0; i < stringsCount; i++) {
    console.log(`${i}: ${strings[i]}`)
  }

  let result = {}

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
