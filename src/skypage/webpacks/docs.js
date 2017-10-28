const { dirname } = require('path')

// i forget which one gets used
export const target = 'browser'
export const buildTarget = 'browser'
export const libraryTarget = 'umd'

export function entry() {
  const { runtime } = this

  return {
    docs: [runtime.join('src', 'docs.js')],
  }
}

export function outputPath() {
  return this.runtime.join('public')
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
            babelrc: false,
            ...babelConfig.call(this),
          },
        },
      ]).filter(v => v),
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
      use: [
        {
          loader: 'url-loader',
          options: { limit: 65000 },
        },
      ],
    },
    {
      test: /\.(jpe?g|png|gif)$/,
      use: [
        {
          loader: 'url-loader',
          options: { limit: 65000 },
        },
        {
          loader: 'image-webpack-loader',
          options: {},
        },
      ],
    },
  ]
}

export function webpackPlugins() {
  return []
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
    ]),
  }
}
