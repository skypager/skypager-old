import * as markdown from './docTypes/markdown'

export const profiles = markdown.profiles

export const rules = [/(\.(md|markdown|mkd))$/i]

export const testDoc = doc => rules[0].test(doc.path)

export const toAST = (content, options = {}) => {
  const processor = profiles.standard(options)
  return processor.parse(content)
}

export function readFrontmatter({ children = [] } = {}) {
  const first = children[0] || {}
  const { type = 'yaml', value = '' } = first

  if (type === 'yaml') {
    return value
  }

  return ''
}

export function parseFrontmatter(content, options = {}) {
  const { type = 'yaml' } = options

  try {
    if (type === 'yaml') {
      return require('js-yaml').safeLoad(content)
    }

    return { ...(options.defaults || {}) }
  } catch (error) {
    return { message: error.message, content, options }
  }
}

export const compile = (content, options = {}) => {
  const { profile = 'standard' } = options
  const ast =
    typeof content === 'object' ? content : toAST(content, { profile: 'standard', method: 'parse' })

  const compiled = profiles[profile](options).stringify(ast)

  return compiled
}

export const getUtils = () => markdown
