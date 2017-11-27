import HtmlWebpackPlugin from 'html-webpack-plugin'

export const target = 'electron-renderer'

export function entry() {
  const { runtime } = this
  const {
    hot = skypager.commandPhrase === 'run hot',
    host = 'localhost',
    port = 3000,
  } = this.options

  const rendererPath = runtime.join('src', 'renderer.js')

  const hotEntries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
    'expose-loader?skypager!skypager-runtimes-electron/renderer.js',
  ]

  return {
    renderer: [...(hot ? hotEntries : []), rendererPath],
  }
}

export function outputPath() {
  return this.runtime.resolve('public')
}

export function outputFilename() {
  return '[name].js'
}

export function moduleLocations() {
  return [this.runtime.join('src')]
}

export function rules() {
  const { compact } = this.lodash
  const { runtime } = this

  return [
    {
      name: 'babel',
      test: /\.js$/,
      exclude: [/node_modules/, runtime.join('node_modules'), runtime.join('src/templates')],
      use: compact([
        {
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        },
      ]).filter(v => v),
    },
  ]
}

export function externals() {
  return {
    'skypager-runtimes-electron': 'commonjs2 skypager-runtimes-electron/renderer.js',
    react: 'global React',
    'react-dom': 'global ReactDOM',
    'react-router-dom': 'global ReactRouterDOM',
    'semantic-ui-react': 'global semanticUIReact',
    'prop-types': 'global PropTypes',
    axios: 'global axios',
    moment: 'global moment',
    mobx: 'global skypager.mobx',
    lodash: 'global skypager.lodash',
  }
}

export function configWasGenerated(config) {
  if (skypager.devHtmlInserted) {
    return config
  }

  if (skypager.commandPhrase !== 'run hot') {
    skypager.devHtmlInserted = true

    config.plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/templates/html.dev.js',
        skypager: this.runtime,
        runtime: this.runtime,
        inject: false,
        filename: 'dev.html',
      })
    )
    return config
  }
}

export function webpackPlugins() {
  const { runtime } = this
  const { dirname } = runtime.pathUtils
  const res = (...args) => runtime.packageFinder.attemptResolve(...args)
  const from = (...args) => ({ from: res(...args) })

  return {
    'html-webpack-plugin': {
      template: 'src/templates/html.dev.js',
      skypager: runtime,
      runtime: runtime,
      inject: true,
      filename: 'index.html',
    },

    'copy-webpack-plugin': [
      from('react/dist/react.js'),
      from('react-dom/dist/react-dom.js'),
      from('prop-types/prop-types.js'),
      from('react-router-dom/umd/react-router-dom.js'),
      from('semantic-ui-react/dist/umd/semantic-ui-react.min.js'),
      from('react-json-inspector/json-inspector.css'),
      {
        from: res('skypager-runtimes-electron/renderer.js'),
        to: 'skypager-runtimes-electron-renderer.js',
      },
      {
        from: dirname(res('semantic-ui-css/semantic.css')),
        to: runtime.join('public'),
        flatten: false,
        ignore: [
          '**/components/**',
          'components/**',
          'README.md',
          'LICENSE',
          'package.json',
          'package.js',
        ],
      },
    ],
  }
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
            browsers: ['>10%'],
          },
        },
      ],
      packageFinder.attemptResolve('babel-preset-stage-0'),
      packageFinder.attemptResolve('babel-preset-react'),
    ]),
    plugins: validate([
      packageFinder.attemptResolve('babel-plugin-transform-decorators-legacy'),
      packageFinder.attemptResolve('babel-plugin-transform-object-rest-spread'),
      !runtime.isProduction && packageFinder.attemptResolve('webpack-hot-loader/babel'),
    ]),
  }
}
