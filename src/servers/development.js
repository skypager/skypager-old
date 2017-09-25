import fallback from "express-history-api-fallback"

export const configFeatures = () => ({
  folder(existing = [], option) {
    if (!option) return existing

    return [...existing, ...option]
  }
})

export const configReducers = () => ({
  folder(state = {}) {
    const { folder } = state

    return folder
  }
})

export function appWillMount(app) {
  const { express, runtime } = this
  const { resolve } = runtime
  const { defaultsDeep: defaults } = runtime.lodash

  const { useFallback = true, folders = [], publicFolder = "public" } = defaults(
    {},
    this.options,
    this.config
  )

  folders
    .filter(f => f && typeof f === "string")
    .forEach(folder => app.use(express.static(resolve(folder))))

  app.get("/selectors", (req, res) => {
    res.json({ results: skypager.selectors.available })
  })

  app.get("/select/:selector*", async (req, res) => {
    const selector = [req.params.selector, req.params["0"] || ""].join("")
    const results = await skypager
      .select(selector, {
        headers: req.headers,
        body: req.body,
        path: req.path,
        params: req.params,
        ...req.params,
        selector
      })
      .catch(error => ({
        error: true,
        message: error.message,
        stack: error.stack,
        params: req.params,
        selector
      }))
      .then(results => results || {})

    res.status(results.error ? 500 : 200).json({
      selector,
      results,
      params: req.params
    })
  })

  app.use(express.static(resolve(publicFolder)))

  useFallback && app.use(fallback("index.html", { root: resolve(publicFolder) }))

  return app
}
