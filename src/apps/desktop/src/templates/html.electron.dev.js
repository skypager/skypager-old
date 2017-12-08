export default (async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page('html')

  page.initialState = {}

  page.dllPublicPath = skypager.argv.hot ? '/' : ''
  page.publicPath = skypager.argv.hot ? '/' : ''

  page.stylesheets = ['semantic.css', 'json-inspector.css']

  page.dllScripts = [
    'react.js',
    'react-dom.js',
    'react-router-dom.js',
    'prop-types.js',
    'semantic-ui-react.min.js',
  ]

  page.headTop = `
  <style>
    html, body, #app {
      height: 100%;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    .MultiDrawerLayout .ui.bottom.sidebar,
    .MultiDrawerLayout .ui.top.sidebar
     {
      height: 50% !important;
    }

    .Console .ui.input input {
      color: #FFFFFF !important;
    }
  </style>
  `

  page.bodyBottom = `
    <script src="../node_modules/skypager-runtimes-electron/renderer.js"></script>
    <script>
      console.log('Dev Script Ready', skypager.electronMain.argv)
    </script>
  `

  return await page.render()
})
