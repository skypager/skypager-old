const babel = require("skypager-document-types-babel")
const markdown = require("skypager-document-types-markdown")

export default async function readFileAsts(chain, options = {}) {
  await this.fileManager.startAsync()

  await this.fileManager.readContent({
    include: this.lodash.compact([
      options.babel !== false && /.js$/,
      options.markdown !== false && /.md$/
    ]),
    ...options
  })

  const results = await this.fileManager.selectMatches(/\.(js|md)$/i)

  return chain
    .plant(results)
    .map(result => {
      if (result.extension === ".js") {
        this.lodash.attempt(
          () =>
            (result.ast = babel.toAST(result.content, {
              presets: ["stage-0", "react"],
              plugins: ["transform-decorators-legacy", "transform-object-rest-spread"]
            }))
        )

        if (result.ast) {
          this.fileManager.files.set(result.relative, {
            ...(this.fileManager.files.get(result.relative) || {}),
            ast: result.ast
          })
        }
        return result
      } else if (result.extension === ".md") {
        this.lodash.attempt(() => (result.ast = markdown.toAST(result.content)))

        if (result.ast) {
          this.fileManager.files.set(result.relative, {
            ...(this.fileManager.files.get(result.relative) || {}),
            ast: result.ast
          })
        }

        return result
      }

      return
    })
    .compact()
    .keyBy(val => val.relative)
    .pickBy(val => val.ast)
}
