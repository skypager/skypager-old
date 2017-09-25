export const configFeatures = () => ({
  set(...args) {
    if (!args.length) return {}

    const [existing = {}, name, fn] = args

    if (typeof name === "string" && typeof fn !== "undefined") {
      return { ...existing, [name]: fn }
    } else if (typeof name === "object") {
      return { ...existing, ...name }
    } else {
      return { ...existing, [name]: fn }
    }
  },

  typeDef(...args) {
    if (!args.length) return
    const [existing = [], data = ""] = args
    return [...existing, data]
  },

  mock(...args) {
    if (!args.length) return
    const [existing = {}, name, fn] = args

    return {
      ...existing,
      [name]: fn
    }
  },

  resolver(...args) {
    if (!args.length) return
    const [existing = {}, name, fn] = args

    return {
      ...existing,
      [name]: fn
    }
  }
})

export function configReducers() {
  const port = this.tryResult("port", 5000)
  const hostname = this.tryResult("hostname", "0.0.0.0")
  const host = this.tryResult("host", "0.0.0.0")

  const { pickBy, isFunction, isEmpty, defaults } = this.lodash

  return {
    serverOptions(state = {}) {
      return defaults(state.set, {
        port,
        host: host || hostname,
        hostname: host || hostname
      })
    },

    typeDef(state = {}) {
      const { typeDef } = state

      const defaultTypeDefs = `

      type Dependency {
        name: String,
        version: String
        type: String
        parent: String
      }

      type Project {
        name: String
        version: String
        description: String
        license: String
        devDependencies: [Dependency]
        dependencies: [Dependency]
        optionalDependencies: [Dependency]
        peerDependencies: [Dependency]
      }

      type Query {
        project(name: String): Project
        projects(limit: Int): [Project]
      }
      `

      if (isEmpty(typeDef)) {
        return defaultTypeDefs
      } else {
        return typeDef.join("\n\n")
      }
    },

    resolver(state) {
      return state.resolver || {}
    },

    mock(state) {
      const { pick, toPairs } = this.lodash

      const normalizeProject = name => {
        const result = this.runtime.packageManager.findByName(name)

        const dep = f =>
          toPairs(result[f] || {}).map(entry => ({
            version: entry[1],
            name: entry[0],
            type: f,
            parent: result.name
          }))

        return {
          ...pick(result, "name", "version", "description", "license"),
          devDependencies: dep("devDependencies"),
          optionalDependencies: dep("optionalDependencies"),
          peerDependencies: dep("peerDependencies"),
          dependencies: dep("dependencies")
        }
      }

      const defaultMocks = {
        Project: (_, { name } = {}) => normalizeProject(name)
      }

      return isEmpty(state.mock) && this.runtime.argv.useMocks
        ? defaultMocks
        : pickBy(state.mock, v => isFunction(v))
    }
  }
}
