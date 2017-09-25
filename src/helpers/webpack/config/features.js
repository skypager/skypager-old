import skypager from "skypager-runtime"
import path from "path"
import isArray from "lodash/isArray"
import isObject from "lodash/isObject"
import isString from "lodash/isString"
import flatten from "lodash/flatten"
import defaults from "lodash/defaultsDeep"
import isPlainObject from "lodash/isPlainObject"

// exports
export function context(existing, folder = skypager.cwd) {
  return path.resolve(folder)
}

export function banner(existing = [], ...args) {
  return [...existing, args]
}

export function alias(existing = {}, from, to) {
  if (!arguments.length) {
    return
  }

  return {
    ...existing,
    [from]: to || skypager.resolve("node_modules", from),
  }
}

export function copy(existing = [], ...args) {
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

const fromObject = entries =>
  Object.keys(entries).reduce((acc, key) => {
    const entry = entries[key]

    return {
      ...acc,
      [key]: Array.isArray(entry) ? entry : [entry],
    }
  }, {})

const fromString = entry => {
  const parsed = path.parse(entry)
  const basename = path.basename(parsed.base, parsed.ext).toLowerCase()

  return {
    [basename]: [entry],
  }
}

export function entry(existing, arg) {
  if (isObject(arg)) {
    return {
      ...existing,
      ...fromObject(arg),
    }
  }

  if (isString(arg)) {
    return {
      ...existing,
      ...fromString(arg),
    }
  }

  return existing
}

export function env(existing, env) {
  const { runtime = skypager } = this

  return env || (runtime && runtime.env) || process.env.NODE_ENV || "development"
}

export function externals(existing = [], ...args) {
  if (!arguments.length) {
    return
  }

  const externalsOptions = this.get("options.externalsOptions", this.get("externalsOptions", {}))

  const values = args.map(arg => {
    if (isObject(arg) && arg.name && arg.version) {
      return require("../helpers/externals")({
        pkg: arg,
      })
    }

    if (!isString(arg)) {
      return arg
    }

    if (arg.match(/package.json$/)) {
      return require("../helpers/externals")({
        pkg: __non_webpack_require__(arg),
        ...externalsOptions,
      })
    }

    if (arg.match(/node_modules/)) {
      return require("../helpers/externals")({
        modulesDir: arg,
        ...externalsOptions,
      })
    }

    const { dir } = path.parse(arg)

    if (dir) {
      return skypager.resolve(arg)
    }

    return arg
  })

  return [...existing, ...values]
}

export function helper(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}

export function html(existing, cfg) {
  if (!arguments.length) {
    return
  }

  const { runtime = skypager } = this

  if (!existing) {
    existing = []
  }

  if (typeof cfg === "object") {
    return [...existing, defaults({}, cfg, this.get("htmlOptions"), runtime.getOption("htmlOptions"))]
  } else {
    return existing
  }
}

export function inject(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}

export function loader(existing = {}, loader, ext = ".js", options) {
  if (!arguments.length) {
    // eslint-disable-line
    return
  }

  existing = defaults(existing, {
    ".json": [
      {
        loader: "json",
      },
    ],
    ".yml": [
      {
        loader: "json!yaml",
      },
    ],
    ".yaml": [
      {
        loader: "json!yaml",
      },
    ],
  })

  const exts = Array.isArray(ext) ? ext : [ext]

  return exts.reduce((acc, ext) => {
    const loaders = acc[ext] || []

    return {
      ...acc,
      [ext]: [
        ...loaders,
        {
          loader,
          ...options,
        },
      ],
    }
  }, existing)
}

const modRoot = path.join(__dirname, "..")
const loadersPath = path.join(modRoot, "lib", "loaders")
const modulesPath = path.join(modRoot, "node_modules")

export function loaderModules(existing = ["node_modules", modRoot, loadersPath, modulesPath], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}

export function node(existing, polyfills) {
  if (!arguments.length) {
    return
  }

  return {
    ...existing,
    ...polyfills,
  }
}

export function modules(existing = ["node_modules"], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}

export function output(existing, output) {
  if (isPlainObject(output)) {
    return {
      ...existing,
      ...output,
    }
  }

  if (isString(output)) {
    return {
      ...existing,
      path: skypager.resolve(output),
    }
  }

  return existing
}

export function plugin(existing, name, ...args) {
  if (!arguments.length) {
    return
  }

  if (typeof name === "function") {
    args = name
    name = name.name
  }

  return {
    ...existing,
    [name]: args,
  }
}

export function registry(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}

export function skip(existing = [], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}

export function sourcemap(existing, sourcemap) {
  if (!arguments.length) {
    return
  }

  return sourcemap
}

export function target(existing = "web", target) {
  return target || existing
}
