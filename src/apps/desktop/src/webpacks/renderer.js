export const target = 'electron-renderer'

export function entry() {
  const { runtime } = this

  const rendererPath = runtime.join('src', 'renderer.js')

  return {
    renderer: [`expose-loader?runtime!${rendererPath}`],
  }
}

export function outputPath() {
  return this.runtime.resolve('app')
}

export function outputFilename() {
  return '[name].js'
}

export function rules() {
  const { compact } = this.lodash
  const { runtime } = this

  return [
    {
      name: 'babel',
      test: /\.js$/,
      exclude: [
        /node_modules/,
        this.runtime.join('node_modules'),
        this.runtime.join('src/templates'),
      ],
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
    ProvidePlugin: {
      skypager: 'skypager-runtimes-electron/renderer.js',
    },
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
