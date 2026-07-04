#!/usr/bin/env node

import fs from "fs";
import https from "https";
import path from "path";
import zlib from "zlib";

let args = process.argv.slice(2)

if (args.length < 2) {
  throw "You need to pass a resfileindex.txt to the downloader, and a place to download to"
}

let index = fs.readFileSync(args[0], 'utf8').split(/\r?\n/)
let target = args[1]
let pattern = /\.black$/

if (args.length >= 3) {
  pattern = new RegExp(args[2])
}

index = index.map(function (e) {
  if (e == "") {
    return null
  }

  let info = e.split(",")

  return {
    path: info[0].replace(/%20/g, " "),
    cdn: "/" + info[1],
    hash: info[2],
    length: info[3],
    compressedLength: info[4]
  }
})

function isGzip(buffer) {
  return buffer.length >= 2 && buffer[0] === 0x1f && buffer[1] === 0x8b
}

function readResponse(res) {
  return new Promise((resolve, reject) => {
    let chunks = []

    res.on("data", chunk => chunks.push(chunk))
    res.on("end", () => resolve(Buffer.concat(chunks)))
    res.on("error", reject)
  })
}

function decodeResource(buffer) {
  return isGzip(buffer) ? zlib.gunzipSync(buffer) : buffer
}

let agent = new https.Agent({ keepAlive: true, maxSockets: 10 })

for (let i = 0; i < index.length; i++) {
  let e = index[i]

  if (e && e.path.match(pattern)) {
    https.get({ hostname: "resources.eveonline.com", path: e.cdn, agent: agent }, async function (res) {
      const { statusCode } = res

      if (statusCode !== 200) {
        console.error("Failed: %s with status %s", e.path, statusCode)
        return res.resume()
      }

      var filePath = target + e.path.replace(/^res\:/, "")

      fs.mkdirSync(path.dirname(filePath), { recursive: true })

      try {
        let buffer = decodeResource(await readResponse(res))
        fs.writeFileSync(filePath, buffer)
        console.log("Completed %s", e.path)
      } catch (error) {
        console.error("Failed: %s", e.path)
        console.error(error)
      }
    }).on('error', (e) => {
      console.error("Failed: %s", e);
    })
  }
}
