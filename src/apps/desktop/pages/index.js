const pages = require.context(".", true, /\w+\/index.js$/)

export async function registerPages(ctx = pages) {
  skypager.pageComponents.add(ctx)

  let { renderVersion = 0 } = skypager.currentState
  skypager.setState({ renderVersion: (renderVersion = renderVersion + 1) })

  return skypager
}

if (module.hot) {
  module.hot.accept(pages.id, () => {
    registerPages(require.context(".", true, /\w+\/index.js$/)).then(() => {})
  })
}
