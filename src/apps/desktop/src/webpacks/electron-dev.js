import HtmlWebpackPlugin from 'html-webpack-plugin'

export const target = 'web'

export const publicPath = ''

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
          loader: 'react-hot-loader/webpack',
        },
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
    react: 'global React',
    'react-dom': 'global ReactDOM',
    'react-router-dom': 'global ReactRouterDOM',
    'semantic-ui-react': 'global semanticUIReact',
    'prop-types': 'global PropTypes',
    axios: 'global axios',
    moment: 'global moment',
  }
}

export function configWasGenerated(config) {
  config.devServer = {
    ...(config.devServer || {}),
    inline: false,
  }

  console.log(config.externals)
  console.log(config.target)
  return config
}

export function injectPlugins(plugins) {
  console.log('injecting plugins')
}

function externalsOptions() {
  return {
    whitelist: [/webpack-dev-server/, /react-hot-loader/, /webpack\/hot\/only-dev-server/],
  }
}

export function webpackPlugins() {
  const { runtime } = this
  const { dirname } = runtime.pathUtils
  const res = (...args) => {
    const result = runtime.packageFinder.attemptResolve(...args)

    if (!result) {
      return runtime.resolve(...args)
    }

    return result
  }
  const from = (...args) => ({ from: res(...args) })

  return {
    'html-webpack-plugin': {
      template: 'src/templates/html.dev.js',
      skypager: runtime,
      runtime: runtime,
      inject: false,
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
        packageFinder.attemptResolve('react-hot-loader/babel'),
        packageFinder.attemptResolve('babel-preset-env'),
        {
          targets: {
            browsers: ['>10%'],
            node: '6.11.1',
            electron: '1.8.1',
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
