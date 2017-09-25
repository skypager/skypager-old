import fallback from "express-history-api-fallback"

export const configFeatures = () => ({
  folder(existing = [], option) {
    if (!option) return existing

    return [...existing, ...option]
  },
})

export const configReducers = () => ({
  folder(state = {}) {
    const { folder } = state

    return folder
  },
})

export function appWillMount(app) {
  const { express, runtime } = this
  const { resolve } = runtime
  const { debug } = runtime.logger
  const { defaultsDeep: defaults } = runtime.lodash

  const { useFallback = true, folders = [], publicFolder = "public" } = defaults({}, this.options, this.config)

  debug("Serving static files from ", { folders, publicFolder })

  folders.filter(f => f && typeof f === "string").forEach(folder => app.use(express.static(resolve(folder))))

  app.use(express.static(resolve(publicFolder)))

  useFallback && app.use(fallback("index.html", { root: resolve(publicFolder) }))

  return app
}
