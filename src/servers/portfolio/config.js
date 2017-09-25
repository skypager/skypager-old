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
  }
})

export function configReducers() {
  const port = this.tryResult("port", 5001)
  const hostname = this.tryResult("hostname", "0.0.0.0")
  const host = this.tryResult("host", "0.0.0.0")

  const { defaults } = this.lodash

  return {
    serverOptions(state = {}) {
      return defaults(state.set, {
        port,
        host: host || hostname,
        hostname: host || hostname
      })
    }
  }
}
