import { idSymbol, typeSymbol } from "./black.js"
import {JsonStreamStringify} from "json-stream-stringify";
import ora from "ora";


function replacer(context) {
  return function(key, value) {
    if (value === null) return value;

    let id = value[idSymbol]

    if (id && context.references.has(id)) {
      return { "_reference": id }
    } else {
      context.references.set(id, true)
    }

    if (value instanceof Map) {
      let result = {}
      if (id) result["_id"] = id
      let type = value[typeSymbol]
      if (type) result["_type"] = type
      value.forEach((e, k) => {
        result[k] = e && e.buffer instanceof ArrayBuffer && e.BYTES_PER_ELEMENT ? Array.from(e) : e
      })
      return result
    } else {
      return value
    }
  }
}

export function stringifyStream(object, name="") {
  let context = {
    references: new Map()
  }

  return new Promise((resolve, reject) => {
    const jsonStream = new JsonStreamStringify(object, replacer(context));
    const spinner = ora(`converting ${name}`).start();
    let data = '';
    jsonStream.on("data", chunk => {
      data += chunk
    })
    jsonStream.on("end", () => {
      spinner.stop();
      resolve(data)
    })
    jsonStream.on("error", err => {
      spinner.stop();
      reject(err)
    })
  })

}
