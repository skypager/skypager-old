export const createGetter = "bootstrapThemes"

export function featureWasEnabled() {
  const { runtime } = this
  runtime.selectors.add(require.context("./selectors", true, /\.js$/))

  const pagesCtx = require.context("./pages", true, /\.js$/)

  runtime.pages.add(pagesCtx)
}

export const featureMethods = ["renderTemplate"]

export async function renderTemplate(id, options = {}) {
  const page = this.runtime.page(id)
  return page.render()
}
