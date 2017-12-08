import { Helper } from 'skypager-runtime'
import DocumentType from 'skypager-helpers-document-type'

export class Document extends Helper {
  static isCacheable = true

  static isObservable = true

  static allowAnonymousProviders = true

  static attach(runtime, options = {}) {
    if (!runtime.has('documentType')) {
      DocumentType.attach(runtime)
    }

    const result = Helper.attach(runtime, Document, {
      registryProp: 'documents',
      lookupProp: 'document',
      cacheHelper: true,
      isCacheable: true,
      registry:
        options.registry ||
        Helper.createContextRegistry('documents', {
          context: Helper.createMockContext(),
        }),
      ...options,
    })

    return result
  }

  static observables(options = {}, context = {}) {
    const doc = this

    return {
      observableAttributes: [
        'shallowMap',
        {
          content: doc.attributes.content,
          hash: doc.attributes.hash,
          path: doc.attributes.path,
        },
      ],
    }
  }

  get documentAttributes() {
    return this.tryResult('documentAttributes', [
      'id',
      'relative',
      'path',
      'extension',
      'base',
      'content',
      'ast',
      'astHash',
      'hash',
      'stats',
      'mime',
    ])
  }

  initialize() {
    this.applyInterface(this.instanceMixin, this.instanceMixinOptions)
  }

  formatPath(path) {
    const formatter = this.tryGet(
      'docType.formatPath',
      this.tryGet('formatPath', this.lodash.identity)
    )
    return formatter(path)
  }

  get blankAST() {
    return this.tryGet('docType.blankAST', this.tryGet('blankAst'))
  }

  get attributes() {
    const { provider = {}, options = {} } = this
    const pick = obj => this.lodash.pick(obj, this.documentAttributes)
    const base = this.lodash.defaultsDeep({}, pick(options), pick(provider), {
      ast: this.blankAST,
      content: '',
      meta: {
        ...(provider.meta || {}),
      },
    })

    return {
      ...base,
      path: this.formatPath(base.path),
    }
  }

  get docType() {
    if (this.docTypeId) {
      try {
        return this.runtime.documentType(this.docTypeId)
      } catch (e) {}
    }
  }

  get docTypeId() {
    return this.tryGet('docTypeId', this.matchingDocumentTypes[0])
  }

  get matchingDocumentTypes() {
    return this.runtime.chain
      .get('documentTypes.available', [])
      .filter(docTypeId => {
        const docType = this.runtime.documentType(docTypeId)
        return docType.testDoc(this.attributes)
      })
      .value()
  }

  get documentTypes() {
    return this.runtime.documentTypes
  }

  get collectionMixin() {
    return this.get('docType.collectionMixin', {})
  }

  get instanceMixin() {
    return this.get('docType.interfaceMixin', {})
  }

  get collectionMixinOptions() {
    const opts = this.tryResult('collectionMixinOptions') || this.tryResult('mixinOptions') || {}
    return this.lodash.defaults(
      {},
      opts,
      this.get('docType.collectionMixinOptions', {}),
      this.get('docType.mixinOptions', {}),
      this.defaultMixinOptions
    )
  }

  get instanceMixinOptions() {
    const opts = this.tryResult('instanceMixinOptions') || this.tryResult('mixinOptions') || {}
    return this.lodash.defaults(
      {},
      opts,
      this.get('docType.instanceMixinOptions', {}),
      this.get('docType.mixinOptions', {}),
      this.defaultMixinOptions
    )
  }

  get defaultMixinOptions() {
    return {
      transformKeys: true,
      scope: this,
      partial: [this.context],
      insertOptions: true,
      right: true,
      hidden: false,
    }
  }
}

export default Document

export const isCacheable = true

export const attach = Document.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf('document') === -1) {
    Helper.registerHelper('document', () => Document)
  }
}
