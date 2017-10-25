export default async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page('html')

  page.initialState = {}

  page.dllPublicPath = '/'
  page.publicPath = '/'

  page.stylesheets = ['semantic.css']

  page.dllScripts = [
    'react.js',
    'react-dom.js',
    'prop-types.js',
    'semantic-ui-react.min.js',
    'skypager-web.js',
    'axios.js',
    'moment.min.js',
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

  <script>
    window.process = window.process || {}
    window.process.env = window.process.env || {};
    window.process.env.NODE_ENV = 'develop';
    window.process.env.GIT_BRANCH = '${skypager.gitInfo.branch}';
    window.process.env.GIT_SHA = '${skypager.gitInfo.abbreviatedSha}';
    window.process.env.GIT_VERSION = '${skypager.currentPackage.version}';
  </script>
  `

  return await page.render()
}
