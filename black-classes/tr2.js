import * as r from '../black-readers.js'

class ConstantParameter {
  constructor(name, value) {
    this.name = name
    this.value = value
  }
  
  static readStruct(reader) {
    let name = r.string(reader)

    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")
    reader.expectU16(0, "unknown content")

    let value = r.vector4(reader)

    return new ConstantParameter(name, value)
  }
}

export default function(map) {
  map.set('Tr2Effect', new Map([
    ['effectFilePath', r.path],
    ['name', r.string],
    ['parameters', r.array],
    ['resources', r.array],
    ['constParameters', r.structList(ConstantParameter)],
    ['options', (reader) => { throw "lulz" }]
  ]))
}
