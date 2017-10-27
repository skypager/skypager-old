import { Helper } from 'skypager-runtime'

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, '').replace(/\.js$/, '')]: req(key).default || req(key),
    }),
    {}
  )

export class DocumentType extends Helper {
  static configFeatures() {
    return mapContext(require.context('./config/features', false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context('./config/reducers', false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, DocumentType, {
      registry: Helper.createContextRegistry('document-type', {
        context: require.context('../../document-types', false, /.js$/),
      }),
      ...options,
    })
  }

  readFrontmatter(doc) {
    const readFrontmatter = this.tryGet('readFrontmatter')
    return (readFrontmatter && readFrontmatter.call(this, doc, this.context)) || ''
  }

  parseFrontmatter(doc, options = {}) {
    const parseFrontmatter = this.tryGet('parseFrontmatter')

    try {
      return (
        parseFrontmatter &&
        parseFrontmatter.call(this, this.readFrontmatter(doc, options), options, this.context)
      )
    } catch (error) {
      return {}
    }
  }

  testDoc(doc) {
    const testDoc = this.tryGet('testDoc')
    return !!(testDoc && testDoc(doc))
  }
}

export const registerHelper = () => Helper.registerHelper('document-type', () => DocumentType)

export default DocumentType

export const attach = DocumentType.attach
