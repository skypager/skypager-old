export default async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page("html")

  page.initialState = {
    files: skypager.lodash.mapValues(files, v => skypager.convertToJS(v))
  }

  page.dllPublicPath = ""
  page.publicPath = ""

  page.stylesheets = ["/toolkit-light.min.css"]

  page.headTop = headTop.trim()
  page.dllScripts = ["/toolkit.min.js", "/skypager-react.js"]

  return await page.render()
}

const headTop = `
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Insert this line above script imports  -->
<script>if (typeof module === 'object') {window.module = module; module = undefined;}</script>
<script src="/jquery.min.js"></script>
<script src="/tether.min.js"></script>
`
