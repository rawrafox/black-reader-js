import * as r from '../black-readers.js'

export default function(map) {
  map.set('Tr2Effect', new Map([
    ['effectFilePath', r.path],
    ['name', r.string],
    ['parameters', r.array],
    ['resources', r.array],
    ['constParameters', r.structList((reader) => {
      let parameter = r.string(reader)

      reader.expectU16(0, "unknown content")
      reader.expectU16(0, "unknown content")
      reader.expectU16(0, "unknown content")

      let value = r.vector4(reader)

      return { parameter: parameter, value: value }
    })],
    ['options', (reader) => { throw "lulz" }]
  ]))
}
