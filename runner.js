#!/usr/bin/env node

require = require("esm")(module)

let black = require("./black.js")
let fs = require("fs")

let arguments = process.argv.slice(2)

for (let i = 0; i < arguments.length; i++) {
  let buffer = fs.readFileSync(arguments[i])
  let view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)

  console.log(black.read(view))
}