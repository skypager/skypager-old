export default async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page("html")

  page.initialState = {
    files: skypager.lodash.mapValues(files, v => skypager.convertToJS(v))
  }

  page.dllPublicPath = ""
  page.publicPath = ""

  page.stylesheets = ["https://cdn.skypager.io/themes/marketing/toolkit-minimal.min.css"]

  page.dllScripts = [
    "https://cdn.skypager.io/vendor/jquery.min.js",
    "https://cdn.skypager.io/vendor/tether.min.js",
    "https://cdn.skypager.io/themes/marketing/toolkit.min.js",
    "/skypager-react.js"
  ]

  return await page.render()
}
