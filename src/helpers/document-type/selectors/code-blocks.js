const { camelCase, kebabCase } = require("runtime/utils/string")

module.exports = function(chain, options = {}) {
  const doc = this

  const c = chain
    .invoke("selectCodeBlocks", "javascript", ', code[lang="jsx"], code[lang="es6"], code[lang="react"]')
    .map(v => {
      const docPath = v.getHeadingPath()
      const pathParts = docPath.split("/")

      const codeBlock = {
        docPath,
        pathParts,
        accessor: camelCase(kebabCase(docPath.replace(/\//g, "_"))),
        heading: pathParts[pathParts.length - 1],
        section: pathParts.length > 2 ? pathParts[pathParts.length - 2] : pathParts[pathParts.length - 1],
        index: v.index,
        value: v.value,
        docId: doc.id,
        lang: v.lang,
      }

      return codeBlock
    })

  if (options.keyBy) {
    return c.keyBy(options.keyBy)
  } else if (options.groupBy) {
    return c.groupBy(options.groupBy)
  } else {
    return c.groupBy("docPath")
  }
}
