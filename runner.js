#!/usr/bin/env node
import * as black from "./black.js";
import * as dough from "./dough.js";
import { stat, readdir, readFile,  mkdir, writeFile  } from "fs/promises";
import path from "path";


let args = process.argv.slice(2)
let context = new black.Context()
let debugContext = black.nullDebugContext
// let debugContext = new black.VerboseDebugContext(console)

async function processPath(p, output) {
  const stats = await stat(p);
  if (stats.isDirectory()) {
    const files = await readdir(p);
    for (let i = 0; i < files.length; i++) {
      await processPath(path.join(p, files[i]), path.join(output, files[i].replace(/\.black$/, ".dough")))
    }
  } else {
    if (path.extname(p) === ".black") {
      let buffer = await readFile(p)
      let view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength)
      let result = await dough.stringifyStream(black.read(view, context, debugContext),p)
      await mkdir(path.dirname(output), {recursive: true})
      await writeFile(output, result, 'utf-8')
      console.log("%s => %s", p, output)
    }
  }
}

async function main() {
  for (let i = 0; i < args.length - 1; i++) {
    await processPath(args[i], args[args.length - 1])
  }
}

main()
    .then(() => process.exit(0))
    .catch(err =>
    {
      console.error(err);
      process.exit(1);
    })



