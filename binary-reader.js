let stringDecoder = new TextDecoder('utf-8')
let wstringDecoder = new TextDecoder('utf-16le')

function expect(actual, expected, message) {
  if (actual != expected) {
    throw `${message}: expected ${expected}, got ${actual}`
  }
}

export default class BinaryReader {
  constructor(view) {
    this.view = view
    this.offset = 0

    this.constructors = null
    this.defaultConstructor = null
    this.references = null
    this.strings = null
  }

  get length() {
    return this.view.byteLength - this.offset
  }

  atEnd() {
    return this.length == 0
  }

  readBinaryReader(n) {
    let reader = new BinaryReader(this.readDataView(n))

    reader.constructors = this.constructors
    reader.defaultConstructor = this.defaultConstructor
    reader.references = this.references
    reader.strings = this.strings

    return reader
  }

  readCString() {
    let view = this.view
    let startOffset = this.offset
    while (this.readU8() != 0) { }
    let arrayOffset = view.byteOffset + startOffset
    let arrayLength = this.offset - startOffset - 1
    let array = new Uint8Array(view.buffer, arrayOffset, arrayLength)

    return stringDecoder.decode(array)
  }

  readCWString() {
    let view = this.view
    let startOffset = this.offset
    while (this.readU16() != 0) { }
    let arrayOffset = view.byteOffset + startOffset
    let arrayLength = this.offset - startOffset - 2
    let array = new Uint8Array(view.buffer, arrayOffset, arrayLength)

    return wstringDecoder.decode(array)
  }

  readDataView(n) {
    if (n < 0) { throw `n should be positive: got ${n}` }

    let view = this.view

    if (this.length < n) {
      throw `n is too big: remaining ${this.length}, got ${n}`
    }

    let value = new DataView(view.buffer, view.byteOffset + this.offset, n)
    this.offset += n
    return value
  }

  readF32() {
    let value = this.view.getFloat32(this.offset, true)
    this.offset += 4
    return value
  }

  readF64() {
    let value = this.view.getFloat64(this.offset, true)
    this.offset += 8
    return value
  }

  readStringU16(key) {
    let value = this.readU16()

    if (value > this.strings.length) {
      throw `reading string ${value}, but only ${this.strings.length} exist`
    }

    return this.strings[value]
  }

  readU8() {
    let value = this.view.getUint8(this.offset, true)
    this.offset += 1
    return value
  }

  readU16() {
    let value = this.view.getUint16(this.offset, true)
    this.offset += 2
    return value
  }

  readU32() {
    let value = this.view.getUint32(this.offset, true)
    this.offset += 4
    return value
  }

  expectEnd(message) {
    if (this.length != 0) {
      throw `${message}: expected 0 bytes remaining, got ${this.length}`
    }
  }

  expectU8(expected, message) {
    expect(this.readU8(), expected, message)
  }

  expectU16(expected, message) {
    expect(this.readU16(), expected, message)
  }

  expectU32(expected, message) {
    expect(this.readU32(), expected, message)
  }
}
