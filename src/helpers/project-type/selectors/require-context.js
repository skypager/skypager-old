const { dirname } = require("path")
const camelCase = require("lodash/camelCase")
const capitalize = require("lodash/capitalize")
const omit = require("lodash/omit")

module.exports = function(chain, options = {}) {
  const project = this
  const { cacheKey = options.cacheKey, hashObject } = this

  const start = options.moduleMap ? chain.plant(options.moduleMap) : chain.invoke("select", "module-map", options)

  return start
    .thru(moduleMap => {
      return Object.assign(key => __non_webpack_require__(moduleMap[key]), {
        id: options.id || `${cacheKey}:${hashObject(moduleMap)}`,
        keys() {
          return Object.keys(moduleMap)
        },
        getOptions() {
          return omit(options, "moduleMap")
        },
        getModuleMap() {
          return moduleMap
        },
        resolve(key) {
          return moduleMap[key]
        },
      })
    })
    .thru(contextObject => {
      if (typeof options.stringify === "function") {
        return options.stringify.call(this, contextObject, options)
      } else if (options.stringify === true) {
        return stringify.call(this, contextObject, options)
      } else {
        return contextObject
      }
    })
}

function stringify(requireContext, options = {}) {
  let code = buildContext(requireContext, options)

  if (options.registry) {
    const registryModule = typeof options.registry === "string"
      ? JSON.stringify(options.registry)
      : JSON.stringify("skypager-registry/lib/context")

    code = [
      `const RegistryClass = require(${registryModule}).default`,
      `${code}`,
      `module.exports = (name, options = {}, ...args) => (
         new RegistryClass(name, Object.assign({dirname: __dirname, filename: __filename}, {context: ctx}, options), ...args)
       )
      `,
    ]
      .map(l => l.trim())
      .join("\n")

    return code
  } else {
    return [`${code}; module.exports = ctx;`, ` `].map(l => l.trim()).join("\n")
  }
}

function buildContext(requireContext, options = {}) {
  const keys = JSON.stringify(requireContext.keys())
  const moduleMap = JSON.stringify(requireContext.getModuleMap())
  const getOptions = JSON.stringify(omit(requireContext.getOptions(), "moduleMap"))

  const requireStatements = requireContext
    .keys()
    .map(
      key =>
        `ctx.__modules["${key}"] = ${buildRequireFunction(
          requireContext.resolve(key),
          Object.assign({}, { key, chunkName: getChunkName(key, options) }, options),
        )}`,
    )

  return `
  const ctx = function(key) {
    return ctx.__modules[key]()
  }

  Object.assign(ctx, {
    resolve(key) {
      return ctx.getModuleMap()[key]  
    },
    keys() {
      return ${keys}
    },
    getModuleMap() {
      return ${moduleMap}
    },
    getOptions() {
      return ${getOptions}
    },
  }); 

  Object.defineProperty(ctx, '__modules', {
    enumerable: false,
    configurable: false,
    value: {},
  })

  ${requireStatements.join("\n")}
  `
}

function buildRequireFunction(resourcePath, options = {}) {
  let { loader, query, chunkName = "" } = options

  loader = loader ? (loader.endsWith("!") ? loader : `${loader}!`) : ""

  query = query ? (query.startsWith("?") ? query : `${query}`) : ""

  chunkName = chunkName.length > 0 ? `,"${camelCase(capitalize(chunkName.replace(/\W+/g, "_")))}"` : ""

  let request = resourcePath

  if (loader) {
    request = `${loader}${request}`
  }

  if (query) {
    request = `${request}${query}`
  }

  request = JSON.stringify(request)

  switch (options.type) {
    case "async":
      return `function () {
        return function(cb) {
          require.ensure([], function(require) {
            if (typeof cb !== 'function') {
              throw('You must pass a callback function to perform the async require')
            }
  
            cb && cb(null, require(${request}))
          }${chunkName})
        }
      }`
    case "promise":
      return `function () {
        return new Promise((resolve, reject) => {
          require.ensure([], function(require) {
            try {
              resolve(require(${request}))
            } catch(error) {
              reject(error)
            }
          }${chunkName})
        })
      }`
    case "import":
      return `function () { return System.import(${request}) }`
    default:
      return `function () { return require(${request}) }`
  }
}

function getChunkName(key, options = {}) {
  return key.replace(options.prefix, "").replace(/\/?\w+\.\w+$/, "")
}
