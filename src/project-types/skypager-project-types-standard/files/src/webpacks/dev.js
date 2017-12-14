// i forget which one gets used
export const target = 'node'
export const buildTarget = 'node'

export function entry() {
  const { runtime } = this

  return {
    index: runtime.join('src', 'index.js')
  }
}

export function outputPath() {
  return this.runtime.join('lib')
}

export function moduleLocations() {
  return [this.runtime.join('src'), 'node_modules']
}

export function rules() {
  const { compact } = this.lodash

  return [
    {
      name: 'babel',
      test: /\.js$/,
      exclude: [/node_modules/, this.runtime.join('node_modules')],
      use: compact([
        {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            ...babelConfig.call(this)
          }
        }
      ]).filter(v => v)
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
            browsers: ['>5%'],
            node: 'current'
          }
        }
      ],
      packageFinder.attemptResolve('babel-preset-stage-0'),
      packageFinder.attemptResolve('babel-preset-react')
    ]),
    plugins: validate([
      packageFinder.attemptResolve('babel-plugin-transform-decorators-legacy'),
      packageFinder.attemptResolve('babel-plugin-transform-object-rest-spread')
    ])
  }
}
