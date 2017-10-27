const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { dirname } = require('path')
const { rules, copy, babelConfig } = require('./shared')

export { babelConfig, rules }

export function entry() {
  const { runtime } = this

  return {
    app: [runtime.join('src', 'index.web.js')],
  }
}

export const buildTarget = 'browser'

export const outputFilename = '[name].[hash].js'

export function outputPath() {
  return this.runtime.join('public')
}

export function moduleLocations() {
  return [this.runtime.join('src'), 'node_modules']
}

export function webpackPlugins() {
  const res = m => this.runtime.packageFinder.attemptResolve(m)

  return this.runtime.convertToJS({
    'html-webpack-plugin': {
      template: 'src/templates/html.js',
      skypager: this.runtime,
      runtime: this.runtime,
      inject: true,
      filename: 'index.html',
    },

    ExternalsPlugin: {
      react: 'global React',
      'semantic-ui-react': 'global semanticUIReact',
      skypager: 'global skypager',
      'react-dom': 'global ReactDOM',
      'prop-types': 'global PropTypes',
      axios: 'global axios',
      moment: 'global moment',
    },

    'uglifyjs-webpack-plugin': {
      warnings: false,
      compress: {
        warnings: false,
      },
    },

    'extract-text-webpack-plugin': 'styles.css',

    'copy-webpack-plugin': [
      { from: res('skypager-runtimes-web/skypager-web.js') },
      { from: res('skypager-runtimes-web/skypager-web.min.js') },
      { from: res('moment/min/moment.min.js') },
      { from: res('axios/dist/axios.js') },
      { from: res('axios/dist/axios.min.js') },
      { from: res('react/dist/react.js') },
      { from: res('react/dist/react.min.js') },
      { from: res('prop-types/prop-types.js') },
      { from: res('prop-types/prop-types.min.js') },
      { from: res('react-dom/dist/react-dom.js') },
      { from: res('react-dom/dist/react-dom.min.js') },
      { from: res('semantic-ui-react/dist/umd/semantic-ui-react.min.js') },

      { from: this.runtime.join('src', 'vendor'), flatten: false },

      {
        from: dirname(res('semantic-ui-css/semantic.min.css')),
        to: this.runtime.join('public'),
        flatten: false,
      },
    ],
  })
}
