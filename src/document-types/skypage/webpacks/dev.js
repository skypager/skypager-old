const ExtractTextPlugin = require('extract-text-webpack-plugin')

const { dirname } = require('path')
const loaderUtils = require('loader-utils')

// i forget which one gets used
export const target = 'web'
export const buildTarget = 'web'

export function entry() {
  const { runtime } = this
  const { host = 'localhost', port = 3000 } = runtime.argv

  return {
    app: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      runtime.join('src', 'index.web.js'),
    ],
  }
}

export function outputPath() {
  return this.runtime.join('public')
}

export function moduleLocations() {
  return [this.runtime.join('src'), 'node_modules', this.runtime.resolve('../../../node_modules')]
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
    {
      test: /.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader'],
      }),
    },
  ]
}

export function webpackPlugins() {
  const res = m => this.runtime.packageFinder.attemptResolve(m)

  return this.runtime.convertToJS({
    'html-webpack-plugin': {
      template: 'src/templates/html.dev.js',
      skypager: this.runtime,
      runtime: this.runtime,
      inject: true,
      filename: 'index.html',
    },

    'extract-text-webpack-plugin': 'styles.css',

    ExternalsPlugin: {
      react: 'global React',
      'semantic-ui-react': 'global semanticUIReact',
      skypager: 'global skypager',
      'react-dom': 'global ReactDOM',
      'prop-types': 'global PropTypes',
      axios: 'global axios',
      moment: 'global moment',
    },

    'copy-webpack-plugin': [
      { from: this.runtime.resolve('../../../node_modules/skypager-runtimes-web/skypager-web.js') },
      {
        from: this.runtime.resolve(
          '../../../node_modules/skypager-runtimes-web/skypager-web.min.js'
        ),
      },
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
        from: dirname(res('semantic-ui-css/semantic.css')),
        to: this.runtime.join('public'),
        flatten: false,
      },
    ],
  })
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
