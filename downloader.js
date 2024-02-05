#!/usr/bin/env node

import fs from "fs";
import http from "http";
import path from "path";
import zlib from "zlib";

let args = process.argv.slice(2)

if (args.length < 2) {
  throw "You need to pass a resfileindex.txt to the downloader, and a place to download to"
}

let index = fs.readFileSync(args[0], 'utf8').split("\r\n")
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
    path: info[0].replace("%20", " "),
    cdn: "/" + info[1],
    hash: info[2],
    length: info[3],
    compressedLength: info[4]
  }
})

let agent = new http.Agent({ keepAlive: true, maxSockets: 10 })

for (let i = 0; i < index.length; i++) {
  let e = index[i]

  if (e && e.path.match(pattern)) {
    http.get({ hostname: "resources.eveonline.com", path: e.cdn, agent: agent }, function (res) {
      const { statusCode } = res

      if (statusCode !== 200) {
        console.error("Failed: %s with status %s", e.path, statusCode)
        return res.resume()
      }

      var filePath = target + e.path.replace(/^res\:/, "")

      fs.mkdirSync(path.dirname(filePath), { recursive: true })

      var file = fs.createWriteStream(filePath)

      res.pipe(zlib.createGunzip()).pipe(file)

      file.on('finish', function() {
        file.close()
        console.log("Completed %s", e.path)
      })
    }).on('error', (e) => {
      console.error("Failed: %s", e);
    })
  }
}
