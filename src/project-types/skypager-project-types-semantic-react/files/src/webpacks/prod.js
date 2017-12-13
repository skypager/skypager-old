const ExtractTextPlugin = require('extract-text-webpack-plugin')
const { dirname } = require('path')

export function rules() {
  const { compact } = this.lodash
  const { runtime } = this

  return [
    {
      name: 'babel',
      test: /\.js$/,
      exclude: [
        this.runtime.join('node_modules'),
        dirname(this.runtime.packageFinder.attemptResolve('skypager')),
        this.runtime.join('src/templates'),
        dirname(
          dirname(
            this.runtime.resolve(
              this.runtime.packageFinder.attemptResolve('skypager')
            )
          )
        )
      ],
      use: compact([
        !this.runtime.isProduction && { loader: 'react-hot-loader/webpack' },
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            ...babelConfig.call(this)
          }
        }
      ]).filter(v => v)
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: { limit: 65000 }
        }
      ]
    },
    {
      test: /.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader']
      })
    },
    {
      test: /\.(scss|sass)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    },
    {
      test: /\.(jpe?g|png|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: { limit: 65000 }
        },
        {
          loader: 'image-webpack-loader',
          options: {}
        }
      ]
    }
  ]
}

export function babelConfig() {
  const { runtime } = this
  const { packageFinder } = runtime
  const { isString, isArray } = this.lodash

  const validate = items =>
    items
      .filter(item => (isArray(item) && isString(item[0])) || isString(item))
      .filter(i => i && i.length)

  return {
    presets: validate([
      [
        packageFinder.attemptResolve('babel-preset-env'),
        {
          targets: {
            node: ['7.0.0'],
            browsers: ['>5%']
          }
        }
      ],
      packageFinder.attemptResolve('babel-preset-stage-0'),
      packageFinder.attemptResolve('babel-preset-react')
    ]),
    plugins: validate([
      packageFinder.attemptResolve('babel-plugin-transform-decorators-legacy'),
      packageFinder.attemptResolve('babel-plugin-transform-object-rest-spread'),
      !runtime.isProduction &&
        packageFinder.attemptResolve('webpack-hot-loader/babel')
    ])
  }
}

export function entry() {
  const { runtime } = this

  return {
    app: [runtime.join('src', 'index.web.js')]
  }
}

export const buildTarget = 'web'

export const outputFilename = '[name].[hash].js'

export function outputPath() {
  return this.runtime.join('public')
}

export function moduleLocations() {
  return [this.runtime.join('src'), 'packages', 'node_modules']
}

export function webpackPlugins() {
  const res = m => this.runtime.packageFinder.attemptResolve(m)

  const definitions = {}

  return this.runtime.convertToJS({
    'html-webpack-plugin': {
      template: 'src/templates/html.js',
      skypager: this.runtime,
      runtime: this.runtime,
      inject: true,
      filename: 'index.html'
    },

    DefinePlugin: definitions,

    ExternalsPlugin: {
      react: 'global React',
      'semantic-ui-react': 'global semanticUIReact',
      skypager: 'global skypager',
      'react-dom': 'global ReactDOM',
      'prop-types': 'global PropTypes',
      axios: 'global axios',
      moment: 'global moment',
      'react-router-dom': 'global ReactRouterDOM'
    },

    'uglifyjs-webpack-plugin': {
      warnings: false,
      compress: {
        warnings: false
      },
      mangle: true,
      minimize: true,
      comments: false
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
      { from: res('react-router-dom/umd/react-router-dom.min.js') },
      { from: res('react-router-dom/umd/react-router-dom.js') },

      { from: this.runtime.join('src', 'vendor'), flatten: false },
      { from: this.runtime.join('src', 'snapshots'), flatten: false },

      {
        from: dirname(res('semantic-ui-css/semantic.css')),
        to: this.runtime.join('public'),
        flatten: false,
        ignore: [
          '**/components/**',
          'components/**',
          'README.md',
          'LICENSE',
          'package.json',
          'package.js'
        ]
      }
    ]
  })
}
