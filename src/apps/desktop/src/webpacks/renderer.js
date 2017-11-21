export const target = 'electron-renderer'

export function entry() {
  const { runtime } = this
  const { hot = false, host = 'localhost', port = 3000 } = runtime.argv

  const rendererPath = runtime.join('src', 'renderer.js')

  const hotEntries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server',
  ]

  return {
    renderer: [...(hot ? hotEntries : []), rendererPath],
  }
}

export function outputPath() {
  return this.runtime.resolve('app')
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

export function webpackPlugins() {
  return {
    'html-webpack-plugin': {
      template: 'src/templates/html.dev.js',
      skypager: this.runtime,
      runtime: this.runtime,
      inject: true,
      filename: 'index.html',
    },
    'copy-webpack-plugin': [
      {
        from: this.runtime.resolve('src', 'vendor'),
        flatten: false,
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
