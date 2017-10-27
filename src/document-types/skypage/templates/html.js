export default async function compile(params = {}) {
  const { compilation, webpack, webpackConfig, htmlWebpackPlugin: { files, options } } = params
  const { skypager } = options

  const page = skypager.page('html')

  page.initialState = {}

  page.dllPublicPath = '/'
  page.publicPath = '/'

  page.stylesheets = ['semantic.min.css']

  page.dllScripts = [
    'react.min.js',
    'react-dom.min.js',
    'prop-types.min.js',
    'semantic-ui-react.min.js',
    'skypager-web.min.js',
    'axios.min.js',
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
    window.process.env.NODE_ENV = 'production';
    window.process.env.GIT_BRANCH = '${skypager.gitInfo.branch}';
    window.process.env.GIT_SHA = '${skypager.gitInfo.abbreviatedSha}';
    window.process.env.GIT_VERSION = '${skypager.currentPackage.version}';
  </script>
  `

  return await page.render()
}
