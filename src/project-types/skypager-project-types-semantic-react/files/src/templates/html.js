export default (async function compile(params = {}) {
  const {
    compilation,
    webpack,
    webpackConfig,
    htmlWebpackPlugin: { files, options }
  } = params
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
    'react-router-dom.min.js',
    'moment.min.js'
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
  window.process.env.DB_ENV = '${skypager.get('argv.dbEnv', 'production')}'
  window.process.env.DB_VERSION = '${skypager.get('argv.dbVersion', 'v2')}'
  window.process.env.GIT_BRANCH = '${skypager.gitInfo.branch}';
  window.process.env.GIT_SHA = '${skypager.gitInfo.abbreviatedSha}';
  window.process.env.GIT_VERSION = '${skypager.currentPackage.version}';
  window.ARGV = process.env
</script>
  `

  return await page.render()
})
