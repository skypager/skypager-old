import isObject from "lodash/isObject"
import isString from "lodash/isString"
import { resolve, parse } from "path"

export default function externals(existing = [], ...args) {
  if (!arguments.length) {
    return
  }

  const externalsOptions = this.get("options.externalsOptions", this.get("externalsOptions", {}))

  const values = args.map(arg => {
    if (isObject(arg) && arg.name && arg.version) {
      return require("../utils/externals")({
        pkg: arg,
      })
    }

    if (!isString(arg)) {
      return arg
    }

    if (arg.match(/package.json$/)) {
      return require("../utils/externals")({
        pkg: __non_webpack_require__(arg),
        ...externalsOptions,
      })
    }

    if (arg.match(/node_modules/)) {
      return require("../utils/externals")({
        modulesDir: arg,
        ...externalsOptions,
      })
    }

    const { dir } = parse(arg)

    if (dir) {
      return resolve(process.cwd(), arg)
    }

    return arg
  })

  return [...existing, ...values]
}
