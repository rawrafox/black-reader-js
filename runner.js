#!/usr/bin/env node

require = require("esm")(module)

let black = require("./black.js")
let dough = require("./dough.js")
let fs = require("fs")
let path = require("path")

let args = process.argv.slice(2)
let context = new black.Context()
let debugContext = black.nullDebugContext
// let debugContext = new black.VerboseDebugContext(console)

function processPath(p, output) {
  if (fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).forEach((file) => { processPath(path.join(p, file), path.join(output, file.replace(/\.black$/, ".dough"))) })
  } else {
    if (path.extname(p) == ".black") {
      let buffer = fs.readFileSync(p)
      let view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)

      let result = dough.stringify(black.read(view, context, debugContext))

      fs.mkdirSync(path.dirname(output), { recursive: true })
      fs.writeFileSync(output, result)

      console.log("%s => %s", p, output)
    }
  }
}

for (let i = 0; i < args.length - 1; i++) {
  processPath(args[i], args[args.length - 1])
}