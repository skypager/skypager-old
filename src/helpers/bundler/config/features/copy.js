import isArray from "lodash/isArray"
import isObject from "lodash/isObject"
import isString from "lodash/isString"
import flatten from "lodash/flatten"

export default function copy(existing = [], ...args) {
  if (!arguments.length) {
    return
  }

  let arg

  if (args.length === 2 && isString(args[0]) && isString(args[1])) {
    arg = [{ from: args[0], to: args[1] }]
  } else if (args.length === 1 && isString(args[0])) {
    const [fromArg, toArg] = args[0].split(":").map(s => s.trim())
    const val = { from: fromArg }
    if (toArg && toArg.length > 0) {
      val.to = toArg
    }
    arg = [val]
  } else if (args.length === 1 && isArray(args[0])) {
    arg = args[0]
  } else if (args.length === 1 && isObject(args[0]) && ![args[0]]) {
    arg = [args[0]]
  }

  return flatten([...existing, ...arg])
}
