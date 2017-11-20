export default async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page('html')

  page.initialState = {}

  page.dllPublicPath = ''
  page.publicPath = ''

  page.stylesheets = ['semantic.css']

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
  </style>
  `

  return await page.render()
}