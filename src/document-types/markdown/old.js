import yaml from "js-yaml"
import markdown, { utilLoaders as markdownUtils, profiles as markdownProfiles } from "./transformers/markdown"
import testRule from "runtime/utils/path-matcher"
import { kebabCase, camelCase, snakeCase } from "runtime/utils/string"
import omit from "lodash/omit"
import { transpile } from "skypager-document-types-babel"
import lodash from "lodash"

export const rules = [/\.md$/]

export const transformPresets = () => {
  return {
    markdown: Object.keys(markdownProfiles),
  }
}

export const getTransforms = () => {
  return {
    markdown: require("./transformers/markdown").default,
  }
}

export const getUtils = () => {
  const loaders = markdownUtils()

  return Object.keys(loaders).reduce(
    (memo, key) =>
      Object.assign(memo, {
        get [key]() {
          return loaders[key]()
        },
      }),
    {},
  )
}

export const compile = (contents, options = {}) => {
  const profile = options.profile || "standard"
  const html = "html"

  try {
    const ast = toAST(contents, {
      profile,
    })

    return markdown({ profile: "html" }).stringify(ast)
  } catch (error) {
    const stack = ["```", error.stack, "```"].join("\n")
    return markdown({ profile: "html" }).stringify(toAST(`# Error\n\n${error.message}\n\n${stack}\n`))
  }
}

export const toAST = (contents, options) => {
  const profile = options.profile || "standard"

  try {
    return markdown(profile, options).parse(contents)
  } catch (error) {
    return markdown(profile, options).parse(
      `# Error\n\n${error.message}\n\n${createBlock(error.stack)}\n## Contents\n${createBlock(contents)}`,
    )
  }
}

export const testDocument = doc => typeof rules.find(rule => testRule(rule, doc.fileBaseName)) !== "undefined"

export const decorate = doc => {
  doc.lazy("exportables", () => doc.createExportable())
  doc.lazy("exports", () => doc.createExportable())

  Object.assign(doc, {
    stringify() {
      return this.markdown("stringify", {}).stringify(doc.ast)
    },

    toCode(options = {}) {
      const codeBlocks = doc.compileCodeBlocks({ keyBy: "accessor" })

      return codeBlocks
        .mapValues((block, id) =>
          `
      // ${block.docPath} at ${block.index}
      ${block.value}
      `.trim(),
        )
        .values()
        .join("\n\n")
    },

    toModule(options = {}) {
      return doc.project.createModule(doc.toCode(), options)
    },

    toEntity(selectorMap = {}) {
      const obj = doc.exportables
      const frontmatter = obj.frontmatter
      const instance = Object.assign({}, obj, frontmatter)

      if (lodash.isEmpty(selectorMap)) {
        Object.assign(instance, doc.se)
      }
    },

    transformWith(transformerFn, options = {}) {
      const doc = this
      transformerFn.call(doc, doc, options)

      return doc
    },

    createExportable(options = {}) {
      const html = doc.markdown("html", options)

      const source = typeof options.transform === "function"
        ? doc.transformWith(options.transform, options) || doc
        : doc

      const contents = source.contents || source.result("file.contents", () => doc.readFile().get("file.contents", ""))

      const exportable = Object.assign({}, doc.frontmatter, {
        id: source.id,
        get contents() {
          return contents
        },
        get frontmatter() {
          return doc.frontmatter
        },
        get ast() {
          return source.ast
        },
        get file() {
          return omit(doc.file, "contents")
        },
        get html() {
          return doc.remarkHTML({
            ast: source.renderAST || source.ast,
          })
        },
      })

      return exportable
    },

    compileCodeBlocks(options = {}, context = {}) {
      const babelRc = doc.result("project.babelRc", { presets: ["skypager"], plugins: ["transform-decorators-legacy"] })

      return doc.selectChain("code-blocks", options).mapValues(nodes => {
        return nodes.map(node => {
          let result

          try {
            result = transpile(node.value, babelRc)
          } catch (error) {
            result = { error, code: "", metadata: {} }
          }

          Object.assign(node, {
            run() {
              if (result.error) {
                return Promise.resolve(Object.assign(node, { error }))
              }

              return doc
                .asyncRunner(result.code)()
                .then(result => {
                  return Object.assign(node, {
                    get result() {
                      return typeof result.value === "function" ? result.value() : result
                    },
                    inspectResult() {
                      return require("util").inspect(node.result)
                    },
                  })
                })
                .catch(error => {
                  return Object.assign(node, { error })
                })
            },
            get compiled() {
              return result.code
            },
            get metadata() {
              return result.metadata
            },
          })

          return node
        })
      })
    },

    updateFrontmatter(data = {}, save = true) {
      const ast = doc.ast
      let frontmatter = doc.frontmatter

      if (!this.hasFrontmatter()) {
        this.ast.children.unshift({})
      }

      frontmatter = Object.assign(frontmatter, { updatedAt: Math.floor(new Date() / 1000) }, data)

      const { children } = doc.markdown().parse(`---\n${yaml.safeDump(frontmatter)}\n---\n`)

      this.ast.children[0] = children[0]

      if (save) {
        const contents = (doc.contents = doc.file.contents = doc.stringify())
        doc.project.writeFileSync(doc.path, contents)
      }

      return this
    },

    hasFrontmatter() {
      const zero = this.firstNode()
      return zero && zero.type === "yaml"
    },

    remarkAST(options = {}) {
      const profile = options.profile || "standard"
      const contents = options.contents || this.contents || this.getFileContents()

      try {
        const result = doc.markdown(profile, options).parse(contents)

        return Object.assign(result, {
          children: result.children.map(node => doc.decorateNode(node)),
        })
      } catch (error) {
        return doc
          .markdown(profile, options)
          .parse(`# Error\n\n${error.message}\n\n${createBlock(error.stack)}\n## Contents\n${createBlock(contents)}`)
      }
    },

    remarkHTML(options = {}) {
      const profile = options.profile || "standard"
      const parser = options.parser || doc.markdown(profile, options)
      const contents = !options.ast && (options.contents || this.contents || this.getFileContents())
      const ast = options.ast || parser.parse(contents)
      const html = "html"

      try {
        return doc.markdown(html, options).stringify(ast)
      } catch (error) {
        const stack = ["```", error.stack, "```"].join("\n")
        return doc
          .markdown(html, {})
          .stringify(doc.markdown(profile, {}).parse(`# Error\n\n${error.message}\n\n${stack}\n`))
      }
    },

    markdown(profile = "parser", options) {
      return markdown({ profile, ...options })
    },

    createTree() {
      const headings = this.createHeadingsMap("headingPath")

      const tree = {}

      Object.keys(headings).forEach(headingPath => {
        const treePath = headingPath.split("/").map(v => camelCase(kebabCase(v)))
        lodash.set(tree, treePath, headings[headingPath])
      })

      return tree
    },

    createHeadingsMap(keyBy = "accessor", stayChained = false) {
      const obj = this.chain
        .invoke("selectHeadingNodes")
        .map(heading => {
          heading.accessorMethod = camelCase(snakeCase(heading.textContent()))
          heading.headingPath = heading.getHeadingPath()
          heading.accessors = heading.headingPath.split("/").map(i => camelCase(snakeCase(i)))
          heading.accessor = camelCase(snakeCase(heading.headingPath.replace(/\//g, "_")))
          return heading
        })
        .keyBy(keyBy)

      return stayChained ? obj : obj.value()
    },

    stringifyNode(node) {
      return require("mdast-util-to-string")(node)
    },

    getSourceForNode(node) {
      return require("unist-util-source")(node)
    },

    decorateNode(node) {
      const original = lodash.cloneDeep(node)

      return Object.assign(node, {
        original() {
          return original
        },

        slug() {
          return lodash.kebabCase(this.textContent())
        },

        textContent() {
          return doc.stringifyNode(node) || ""
        },

        getHeadingPath() {
          if (node.type !== "heading") {
            const prev = node.previousHeading()
            return prev && prev.getHeadingPath()
          }

          const textContent = kebabCase(node.textContent().toLowerCase())
          const prevSuperior = node.getPreviousSuperior()
          const previousPath = typeof prevSuperior === "undefined"
            ? ``
            : (prevSuperior.depth >= 2 && prevSuperior.getHeadingPath()) || ""

          return [previousPath, textContent].filter(i => i && i.length > 0).join("/")
        },

        headingRangeSync() {
          const alpha = node
          const bravo = node.getFinalHeading() || doc.finalNode()

          return doc.getNodesBetweenPositions(alpha, bravo || 50000).value()
        },

        headingRange(test = node.textContent()) {
          const ast = doc.ast

          return new Promise((resolve, reject) => {
            try {
              require("mdast-util-heading-range")(ast, test, (startNode, nodes, endNode) => {
                resolve({ startNode, nodes, endNode })
              })
            } catch (error) {
              reject(error)
            }
          })
        },

        getFinalHeading() {
          return doc.findAllNodesAfter(node, n => n.type === "heading" && n.depth <= node.depth)[0]
        },

        getPreviousSuperior() {
          return (
            node && node.getNodesBefore && node.getNodesBefore(n => n.type === "heading" && n.depth < node.depth)[0]
          )
        },

        previousHeading() {
          return node.getNodesBefore(n => n.type === "heading").shift()
        },

        nextHeading() {
          return node.type === "heading"
            ? node.getNextNode(n => n.type === "heading" && n.depth >= node.depth)
            : node.getNextNode(n => n.type === "heading")
        },

        getNextNode(...args) {
          return doc.findNodeAfter(node, ...args)
        },

        getNodesAfter(...args) {
          return doc.findAllNodesAfter(node, ...args)
        },

        getNodesBefore(...args) {
          return doc.findAllNodesBefore(node, ...args)
        },

        selectChildren(selector, testFn) {
          if (node.type === "heading") {
            return node.selectHeadingChildren(selector, testFn)
          }

          const results = require("unist-util-select")(node)(selector)

          return typeof testFn === "function" ? results.filter(r => testFn.call(doc, r)) : results
        },

        virtualAST() {
          return {
            type: "root",
            children: node.headingRangeSync().map(n => n.original()).map((n, i) => {
              n.index = i
              return n
            }),
          }
        },

        selectHeadingChildrenSync(selector = "*", testFn) {
          let results = require("unist-util-select")(node.virtualAST())(selector)

          results = typeof testFn === "function" ? results.filter(r => testFn.call(doc, r)) : results

          return results
        },

        selectHeadingChildren(selector = "*", testFn) {
          return node
            .headingRange()
            .then(({ nodes }) => {
              const base = {
                type: "root",
                children: nodes,
              }

              return require("unist-util-select")(base)(selector)
            })
            .then(results => {
              return typeof testFn === "function" ? results.filter(r => testFn.call(doc, r)) : results
            })
        },
      })
    },

    headingRange(test) {
      const ast = doc.ast

      return new Promise((resolve, reject) => {
        try {
          require("mdast-util-heading-range")(ast, test, (startNode, nodes, endNode) => {
            resolve({ startNode, nodes, endNode })
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    documentTitle() {
      const titleNode = doc.titleNode()

      if (!titleNode) {
        return this.get("frontmatter.title", doc.variations.humanized)
      } else {
        return titleNode.textContent()
      }
    },

    yamlBlocks() {
      return this.selectNodes('code[lang="yaml"], yaml')
    },

    introParagraphs() {
      const until = this.selectHeadingNodes()[1] || this.finalNode()

      if (!until) {
        return doc.selectNodes("paragraph")
      } else {
        const children = until.getNodesBefore(node => ["paragraph"].indexOf(node.type) >= 0).reverse()

        return require("mdast-util-to-string")({ type: "root", children })
      }
    },

    wrapSections() {
      const asts = this.sectionHeadingNodes().map(node =>
        this.createAstFromSection(node, {
          offset: false,
          type: "div",
          data: {
            hName: "section",
            hProperties: {
              "data-section-path": node.getHeadingPath(),
              "data-node-index": node.index,
            },
          },
        }),
      )

      return asts
    },

    createDocumentFromSection(node, options = {}) {
      const { startNode = node, endNode, nodes = [] } = node.headingRange()
      const ast = doc.createAstFromSection(startNode, nodes)

      return {
        id: `${doc.id}/~/${node.headingPath || node.getHeadingPath()}`,
        ast,
        contents: require("unist-util-source")(ast),
      }
    },

    createAstFromSection(node, children, options = {}) {
      const startDepth = node.depth
      const offset = options.offset !== false ? 1 - startDepth : 0

      children = children
        .map(node => (node.original ? node.original() : node))
        .map(child => (child.type === "heading" ? Object.assign(child, { depth: child.depth + offset }) : child))

      const newAST = {
        type: options.type || "root",
        children,
        data: options.data || {},
      }

      return newAST
    },

    withoutNodeIndexes(indexList = []) {
      const ast = this.ast

      return {
        type: "root",
        children: children.filter(node => indexList.indexOf(node.index) === -1),
        data: ast.data,
      }
    },

    replaceSection(sectionNode, newNode) {
      return this.extractSectionNodes(sectionNode)
        .then(nodes => this.withoutNodeIndexes(nodes.map(n => n.index)))
        .then(newAst => {
          return newAst
        })
    },

    createContentNode(tagName, attributes = {}, value) {
      const node = {
        type: "div",
        data: {
          hName: tagName || "div",
          hProperties: attributes,
        },
      }

      if (typeof value === "string") {
        node.value = value
      }

      return node
    },

    createAST(options = {}) {
      const newAST = {
        type: options.type || "root",
        children: options.children || [],
        data: options.data || {},
      }

      return newAST
    },

    extractSectionNodes(node) {
      return node.headingRange().then(({ nodes }) => nodes)
    },

    inspectOutline() {
      const headings = this.selectHeadingNodes()

      return headings
        .map(headingNode => {
          const content = `- ${headingNode.textContent()}`
          return lodash.padStart(content, content.length + (headingNode.depth - 1) * 2)
        })
        .join("\n")
    },

    headingIndexes(depth) {
      return this.chain
        .invoke("selectHeadingNodes", depth && `[depth=${depth}]`)
        .sortBy(node => (node.position ? node.position.start.line : node.index))
        .map(node => node.index)
        .value()
    },

    references() {
      return Object.assign({}, this.referenceImages(), this.referenceLinks())
    },

    referenceImages() {
      return this.chain
        .invoke("selectNodes", "imageReference")
        .keyBy("identifier")
        .mapValues((refLink, identifier) => {
          const definitionNodes = doc.definitionNodes()

          return Object.assign(refLink, {
            definitionNode() {
              return definitionNodes[identifier]
            },
            get definition() {
              return lodash.pick(definitionNodes[identifier], "title", "url", "identifier")
            },
          })
        })
        .value()
    },

    imageNodes() {
      return this.selectNodes("image")
    },

    referenceLinks() {
      return this.chain
        .invoke("selectNodes", "linkReference")
        .keyBy("identifier")
        .mapValues((refLink, identifier) => {
          const definitionNodes = doc.definitionNodes()

          return Object.assign(refLink, {
            definitionNode() {
              return definitionNodes[identifier]
            },
            get definition() {
              return lodash.pick(definitionNodes[identifier], "title", "url", "identifier")
            },
          })
        })
        .value()
    },

    definitionNodes() {
      return this.chain.invoke("selectNodes", "definition").keyBy("identifier").value()
    },

    selectHeadingsByDepth(depth = 1) {
      return this.selectHeadingNodes(`[depth=${depth}]`)
    },

    selectOneNode(selector) {
      return require("unist-util-select")(this.ast)(selector)[0]
    },

    selectNodes(selector = "*", testFn) {
      const results = require("unist-util-select")(this.ast)(selector)

      return typeof testFn === "function" ? results.filter(r => testFn.call(doc, r)) : results
    },

    selectHeadingNodes(enhance = "") {
      return doc.selectNodes(`heading${enhance}`.trim())
    },

    selectCodeBlocks(lang = "javascript", enhance = "") {
      return doc.selectNodes(`code[lang=${lang}]${enhance}`.trim())
    },

    findNodeAfter(node, ...args) {
      return require("unist-util-find-after")(this.ast, node, ...args)
    },

    findAllNodesAfter(node, ...args) {
      return require("unist-util-find-all-after")(this.ast, node, ...args)
    },

    findAllNodesBefore(node, ...args) {
      return require("unist-util-find-all-before")(this.ast, node, ...args)
    },

    nodesIndexedByPosition() {
      return doc.chain.get("ast.children").keyBy(node => parseInt(node.position.start.line)).value()
    },

    introNodes() {
      const f = this.selectNodes("heading")
      const m = f.find(n => n.depth > 1)

      const nodes = m ? m.getNodesBefore().reverse() : this.ast.children

      return nodes.filter(n => n.type !== "yaml")
    },

    finalHeading() {
      return this.selectNodes("heading:last-of-type")
    },

    titleNode() {
      return this.selectOneNode("heading[depth=1]") || this.selectOneNode("heading:first-of-type")
    },

    firstSectionHeadingNode() {
      return this.selectOneNode("heading[depth=2]")
    },

    sectionHeadingNodes() {
      return this.selectNodes("heading[depth=2]")
    },

    articleHeadingNodes() {
      return this.selectNodes("heading[depth=3]")
    },

    subarticleHeadingNodes() {
      return this.selectNodes("heading").filter(n => n.depth >= 4)
    },

    getNodesBetweenPositions(alpha, bravo) {
      const start = isNode(alpha) ? alpha.position.start.line : parseInt(alpha)
      const end = isNode(bravo) ? bravo.position.start.line : parseInt(bravo)

      return doc.chain.get("ast.children").filter(node => {
        const { position: { start: { line } } } = node

        return line > start && line < end
      })
    },

    firstNode() {
      return this.chain.get("ast.children", []).first().value()
    },

    finalNode() {
      return this.chain.get("ast.children", []).last().value()
    },

    getAST() {
      const _ast = doc.remarkAST()

      return Object.assign(_ast, {
        children: _ast.children.map((n, i) => {
          const d = doc.decorateNode(n)
          d.index = i
          return d
        }),
      })
    },

    getResults() {
      const codeBlocks = doc.compileCodeBlocks().values().flatten().invokeMap("run").thru(r => Promise.all(r)).value()

      return codeBlocks
        .then(results => {
          doc.hide("codeBlockResults", results)
        })
        .then(() => {
          return this
        })
    },
  })

  doc.lazy("ast", () => doc.getAST())

  doc.lazy("renderAST", () => {
    return doc.remarkAST()
  })

  doc.hide("parseFrontmatter", val => {
    if (!val) {
      const firstNode = doc.get("ast.children[0]", {})
      val = firstNode.type === "yaml" ? firstNode.value : undefined
    }

    return val && val.length > 0 ? yaml.safeLoad(val) : {}
  })

  doc.lazy("frontmatter", () => {
    const firstNode = doc.get("ast.children[0]", {})
    return firstNode.type === "yaml" ? yaml.load(firstNode.value) : {}
  })

  doc.lazy("headingsMap", () => doc.createHeadingsMap())

  return doc
}

export default decorate

function isNode(obj) {
  return typeof obj === "object" && typeof obj.type === "string" && obj.position
}

function createBlock(contents, lang = "") {
  return ["```" + lang, contents, "```"].join("\n")
}
