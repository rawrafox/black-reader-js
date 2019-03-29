#!/usr/bin/env node

require = require("esm")(module)

let black = require("./black.js")
let fs = require("fs")
let path = require("path")

let inputArgs = process.argv.slice(2)

function processPath(p) {
  if (fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).forEach((file) => {
      processPath(path.join(p, file))
    })
  }else {
    if (path.extname(p) === ".black") {
      let buffer = fs.readFileSync(p)
      let view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      let context = new black.Context(new Map())
      console.log(black.read(view, context))
    }
  }
}

for (let i = 0; i < inputArgs.length; i++) {
  processPath(inputArgs[i])
}