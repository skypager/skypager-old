const { dirname } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
          dirname(this.runtime.resolve(this.runtime.packageFinder.attemptResolve('skypager')))
        ),
      ],
      use: compact([
        !this.runtime.isProduction && { loader: 'react-hot-loader/webpack' },
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
      test: /.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
      }),
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
    {
      test: /\.md/,
      use: [
        {
          loader: 'skeleton-loader',
          options: {
            procedure: function skeletonMarkdownLoader(source) {
              let ast
              let meta = {}

              try {
                ast = runtime
                  .documentType('markdown')
                  .provider.parser()
                  .parse(source)

                if (ast && ast.children && ast.children[0] && ast.children[0].type === 'yaml') {
                  Object.assign(meta, require('js-yaml').safeLoad(ast.children[0].value))
                }
              } catch (error) {
                ast = { error: error.message }
              }

              return `module.exports = {
                meta: ${JSON.stringify(meta)},
                content: ${JSON.stringify(source)},
                ast: ${JSON.stringify(ast)},
                id: ${JSON.stringify(runtime.relative(this.resourcePath))}
              }`
            },
          },
        },
      ],
    },
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
            node: ['6.11.1'],
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

export function copy(...additional) {
  const { runtime } = this
  const res = m => runtime.packageFinder.attemptResolve(m)

  const copyFiles = [
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

    { from: runtime.join('src', 'vendor'), flatten: false },

    {
      from: dirname(res('semantic-ui-css/semantic.min.css')),
      to: runtime.join('public'),
      flatten: false,
    },
    ...additional,
  ]

  return copyFiles
}
