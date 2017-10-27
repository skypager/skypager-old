const babelTransformer = require('skypager-document-types-babel')
const markdownTransformer = require('skypager-document-types-markdown')

const defaultBabelConfig = {
  presets: ['stage-0', 'react'],
  plugins: ['transform-decorators-legacy', 'transform-object-rest-spread'],
}

export default async function readFileAsts(chain, options = {}) {
  const runtime = this

  const {
    babelConfig = defaultBabelConfig,
    babel = true,
    markdown = true,
    include = [],
    exclude = [/.log$/, /logs/, /.lock/, /node_modules/, /secrets/, /\.env/],
    extensions = [],
    rootNode,
    props = [],
  } = options

  const transforms = {
    js: (content, o = {}) =>
      babelTransformer.toAST(content, {
        ...this.lodash.defaultsDeep(
          {},
          this.lodash.pick(options, 'presets', 'plugins'),
          babelConfig
        ),
        ...o,
      }),
    md: (content, o = {}) =>
      markdownTransformer.toAST(content, {
        ...this.lodash.pick(options, 'profile', 'method', 'parser'),
        ...o,
      }),
    ...options.transforms,
  }

  const { javascript = babel } = options

  await this.fileManager.startAsync()

  if (!include.length) {
    if (javascript || babel) {
      extensions.push('js', 'es6', 'jsx')
    }

    if (markdown) {
      extensions.push('md', 'mkd', 'markdown')
    }

    include.push(new RegExp(`\.(${extensions.join('|')})$`))
  }

  if (rootNode) {
    include.push(this.resolve(rootNode))
  }

  await this.fileManager.readContent({ ...options, include, exclude })
  await this.fileManager.hashFiles({ ...options, include, exclude })

  const results = await this.fileManager.selectMatches({ rules: include, fullPath: true })

  const transform = (content, transformId, fileId) => {
    const fn = transforms[transformId]

    if (typeof fn !== 'function') {
      throw new Error(`Invalid transform for ${transformId}`)
    }

    try {
      return fn(content, options[`${transformId}Options`] || {})
    } catch (error) {
      if (options.debug) {
        runtime.error(`Error generating ast for ${fileId}`, {
          message: error.message,
          fileId,
          transformId,
          options,
        })
      }

      return { error: true, fileId, transformId, message: error.message }
    }
  }

  return chain
    .plant(results)
    .keyBy('relative')
    .mapValues((file, id) => {
      // TODO: Check the hash and dont generate the ast if it exists already
      const { ast, hash, astHash, content, extension } = file

      if (ast && hash && astHash && hash === astHash) {
        file.ast = ast
      } else {
        file.ast = transform(content, extension.replace('.', ''), file.relative)
        file.astHash = hash
      }

      this.fileManager.files.set(file.relative, file)

      const response = props.length ? runtime.lodash.pick(file, props) : file

      return options.map ? options.map(response) : response
    })
    .thru(astMap => {
      return options.debug
        ? {
            getResults: () => results,
            count: results.length,
            astMap,
            fileIds: results.map(r => r.relative),
            include,
            exclude,
            rootNode,
          }
        : astMap
    })
}
