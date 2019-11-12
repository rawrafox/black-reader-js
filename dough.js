import { idSymbol, typeSymbol } from "./black.js"

function replacer(context) {
  return function(key, value) {
    let id = value[idSymbol]

    if (id && context.references.has(id)) {
      return { "_reference": id }
    } else {
      context.references.set(id, true)
    }

    if (value instanceof Map) {
      let result = {}

      if (id) {
        result["_id"] = id
      }

      let type = value[typeSymbol]

      if (type) {
        result["_type"] = type
      }

      value.forEach((e, k) => {
        result[k] = e
      })

      return result
    } else {
      return value
    }
  }
}

export function stringify(object) {
  let context = {
    references: new Map()
  }

  return JSON.stringify(object, replacer(context), 2)
}
