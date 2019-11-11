let stringDecoder = new TextDecoder('utf-8')
let wstringDecoder = new TextDecoder('utf-16le')

class UnexpectedContentError extends Error {
  constructor(message, actual, expected) {
    super(message)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UnexpectedContentError);
    }

    this.name = "UnexpectedContentError"
    this.actual = actual
    this.expected = expected
  }
}

function expect(actual, expected, message) {
  if (actual != expected) {
    throw new UnexpectedContentError(`${message}`, actual, expected)
  }
}

export default class BinaryReader {
  constructor(view, context) {
    this.view = view
    this.context = context

    this.debugContext = null
    this.fileStart = null
    this.offset = 0
    this.strings = null
  }

  copy() {
    let reader = new BinaryReader(this.view, this.context)

    reader.debugContext = this.debugContext
    reader.fileStart = this.fileStart
    reader.offset = this.offset
    reader.strings = this.strings

    return reader
  }

  get length() {
    return this.view.byteLength - this.offset
  }

  atEnd() {
    return this.length == 0
  }

  readBinaryReader(n) {
    let reader = new BinaryReader(this.readDataView(n), this.context)

    reader.debugContext = this.debugContext
    reader.fileStart = this.fileStart
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

    this.debugContext.log("reading f32 (%d)", value)

    return value
  }

  readF64() {
    let value = this.view.getFloat64(this.offset, true)
    this.offset += 8

    this.debugContext.log("reading f64 (%d)", value)

    return value
  }

  readStringU16() {
    let key = this.readU16()

    if (key > this.strings.length) {
      throw new RangeError(`reading string ${key}, but only ${this.strings.length} exist`)
    }

    let value = this.strings[key]

    this.debugContext.log("reading string (key: %d, value: %s)", key, value)

    return value
  }

  readU8() {
    let value = this.view.getUint8(this.offset, true)
    this.offset += 1

    this.debugContext.log("reading u8 (%d)", value)

    return value
  }

  readU8Array(n) {
    if (n < 0) { throw new RangeError(`n should be positive: got ${n}`) }

    let value = new Uint8Array(n)

    for (let i = 0; i < n; i++) {
      value[i] = this.readU8()
    }

    return value
  }

  readU16() {
    let value = this.view.getUint16(this.offset, true)
    this.offset += 2

    this.debugContext.log("reading u16 (%d)", value)

    return value
  }

  readU16Array(n) {
    if (n < 0) { throw new RangeError(`n should be positive: got ${n}`) }

    let value = new Uint16Array(n)

    for (let i = 0; i < n; i++) {
      value[i] = this.readU16()
    }

    return value
  }

  readU32() {
    let value = this.view.getUint32(this.offset, true)
    this.offset += 4

    this.debugContext.log("reading u32 (%d)", value)

    return value
  }

  readU32Array(n) {
    if (n < 0) { throw new RangeError(`n should be positive: got ${n}`) }

    let value = new Uint32Array(n)

    for (let i = 0; i < n; i++) {
      value[i] = this.readU32()
    }

    return value
  }

  expectEnd(message) {
    if (this.length != 0) {
      throw new UnexpectedContentError(message, `${this.length} bytes`, "0 bytes")
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
