#!/usr/bin/env node

require = require("esm")(module)

let black = require("./black.js")
let fs = require("fs")
let path = require("path")

let arguments = process.argv.slice(2)
let context = new black.Context(new Map())

function processPath(p) {
  if (fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).forEach((file) => { processPath(path.join(p, file)) })
  } else {
    if (path.extname(p) == ".black") {
      let buffer = fs.readFileSync(p)
      let view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)

      console.log(black.read(view, context))
    }
  }
}

for (let i = 0; i < arguments.length; i++) {
  processPath(arguments[i])
}