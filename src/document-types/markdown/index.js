import markdown, {
  utilLoaders as markdownUtils,
  profiles as markdownProfiles
} from "./transformers/markdown"
import testRule from "runtime/utils/path-matcher"

export const rules = [/\.md$/]

export const transformPresets = () => {
  return {
    markdown: Object.keys(markdownProfiles)
  }
}

export const getTransforms = () => {
  return {
    markdown: require("./transformers/markdown").default
  }
}

export const getUtils = () => {
  const loaders = markdownUtils()

  return Object.keys(loaders).reduce(
    (memo, key) =>
      Object.assign(memo, {
        get [key]() {
          return loaders[key]()
        }
      }),
    {}
  )
}

export const HELP_CONTENTS = `
# Using the markdown document type tools

## toAST(code, options = {})

## compile(code, options = {})
`

export const compile = (contents = HELP_CONTENTS, options = {}) => {
  const profile = options.profile || "standard"
  const html = "html"

  try {
    const ast = toAST(contents, {
      profile
    })

    return markdown({ profile: html }).stringify(ast)
  } catch (error) {
    const stack = ["```", error.stack, "```"].join("\n")
    return markdown({ profile: html }).stringify(toAST(`# Error\n\n${error.message}\n\n${stack}\n`))
  }
}

export const toAST = (contents = HELP_CONTENTS, options = {}) => {
  const profile = options.profile || "standard"

  try {
    return markdown(profile, options).parse(contents)
  } catch (error) {
    return markdown(profile, options).parse(
      `# Error\n\n${error.message}\n\n${createBlock(error.stack)}\n## Contents\n${createBlock(
        contents
      )}`
    )
  }
}

export const testDocument = doc =>
  typeof rules.find(rule => testRule(rule, doc.path)) !== "undefined"

function isNode(obj) {
  return typeof obj === "object" && typeof obj.type === "string" && obj.position
}

function createBlock(contents, lang = "") {
  return ["```" + lang, contents, "```"].join("\n")
}
