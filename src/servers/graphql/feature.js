export const featureMethods = [
  "lazyServer",
  "start",
  "lazySchema",
  "createServer",
  "createSchema",
  "addMocks",
  "getTools",
  "getIsSchemaValid"
]

export const createGetter = "graphql"

export * from "./config"

export function getIsSchemaValid() {
  try {
    return this.schema
  } catch (e) {
    return false
  }
}

export function featureWasEnabled() {
  if (this.runtime.servers.available.indexOf("graphql") === -1) {
    this.runtime.servers.register("graphql", () => require("./server"))
  }

  //this.runtime.packageManager.startAsync().then(() => {})
}

export const getTools = () => require("graphql-tools")

export function start(options = {}) {
  return this.server.start(options)
}

export function lazySchema(options = {}) {
  const { pick } = this.lodash

  return this.createSchema(
    pick({ ...this.config, ...this.options, ...options }, "resolvers", "typeDefs", "mocks")
  )
}

export function lazyServer(options = {}) {
  return this.createServer({
    ...(this.config.server || {}),
    ...this.options,
    ...options
  })
}

export function addMocks(mocks = {}) {
  const { schema } = this

  if (!this.lodash.isEmpty(mocks)) {
    addMockFunctionsToSchema({ schema, mocks })
  }

  return this
}

export function createSchema(options = {}) {
  const { isEmpty } = this.lodash
  const { makeExecutableSchema, addMockFunctionsToSchema } = this.tools
  const { logger = this.runtime.logger, typeDefs, mocks = {}, resolvers = {} } = {
    ...this.config,
    ...this.options,
    ...options
  }

  const schema = isEmpty(resolvers)
    ? makeExecutableSchema({ typeDefs, logger })
    : makeExecutableSchema({ typeDefs, resolvers, logger })

  if (!isEmpty(mocks)) {
    addMockFunctionsToSchema({ schema, mocks })
  }

  return schema
}

export function createServer(options = {}) {
  const { host, hostname, port, schema = this.schema } = {
    ...(this.config.serverOptions || {}),
    ...this.config,
    ...this.options,
    ...options
  }

  return this.runtime.server("graphql", {
    port: port || 4000,
    host: host || hostname || "0.0.0.0",
    schema,
    ...options
  })
}
