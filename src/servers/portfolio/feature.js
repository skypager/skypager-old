export const featureMethods = ["lazyServer", "start", "createServer"]

export const createGetter = "portfolioServer"

export * from "./config"

export function featureWasEnabled() {
  if (this.runtime.servers.available.indexOf("portfolio") === -1) {
    this.runtime.servers.register("portfolio", () => require("./server"))
  }

  initializeManagers.call(this).then(() => {})
}

export async function initializeManagers() {
  await this.runtime.fileManager.startAsync()
  await this.runtime.packageManager.startAsync()

  return this
}

export function start(options = {}) {
  return this.server.start(options)
}

export function lazyServer(options = {}) {
  return this.createServer({
    ...(this.config.serverOptions || {}),
    ...this.options,
    ...options
  })
}

export function createServer(options = {}) {
  const { host, hostname, port } = {
    ...(this.config.serverOptions || {}),
    ...this.config,
    ...this.options,
    ...options
  }

  return this.runtime.server("portfolio", {
    port: port || 5001,
    host: host || hostname || "0.0.0.0",
    ...options
  })
}
