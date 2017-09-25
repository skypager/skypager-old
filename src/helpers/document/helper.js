const isFunction = o => typeof o === "function"
import { Helper } from "skypager-runtime"
import DocumentType from "skypager-helpers-document-type"

export class Document extends Helper {
  static isCacheable = true

  static isObservable = true

  static attach(runtime, options = {}) {
    if (!runtime.has("documentType")) {
      DocumentType.attach(runtime)
    }

    const result = Helper.attach(runtime, Document, {
      registryProp: "documents",
      lookupProp: "document",
      cacheHelper: true,
      isCacheable: true,
      registry:
        options.registry ||
          Helper.createContextRegistry("documents", {
            context: Helper.createMockContext()
          }),
      ...options
    })

    runtime.activateDocumentWatcher = function(fm) {
      Document.listenToFileManager(fm)
      return runtime
    }

    return result
  }

  static listenToFileManager(fileManager) {
    const { runtime } = fileManager

    fileManager.on("receivedFile", (id, file) => {
      runtime.documents.register(id, () => ({
        fileManagerId: id,
        file,
        getFile() {
          return runtime.fileManager.file(id)
        },
        async lookupFile() {
          const file = runtime.fileManager.file(id)

          if (!file.hash) {
            await file.calculateHash()
          }
          if (!file.content) {
            await file.readContent()
          }

          return file
        }
      }))
    })

    fileManager.files.entries().forEach(entry => {
      const [id, file] = entry

      runtime.documents.register(id, () => ({
        fileManagerId: id,
        file,
        getFile() {
          return runtime.fileManager.file(id)
        },
        async lookupFile() {
          const file = runtime.fileManager.file(id)

          if (!file.hash) {
            await file.calculateHash()
          }
          if (!file.content) {
            await file.readContent()
          }

          return file
        }
      }))
    })

    return fileManager
  }

  get matchingDocumentTypes() {
    return []
  }

  get documentTypes() {
    return this.runtime.documentTypes
  }

  get collectionMixin() {
    return {}
  }

  get instanceMixin() {
    return {}
  }

  get collectionMixinOptions() {
    const opts = this.tryResult("collectionMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, opts, this.defaultMixinOptions)
  }

  get instanceMixinOptions() {
    const opts = this.tryResult("instanceMixinOptions") || this.tryResult("mixinOptions") || {}
    return defaults({}, opts, this.defaultMixinOptions)
  }

  get defaultMixinOptions() {
    return {
      transformKeys: true,
      scope: this,
      partial: [this.context],
      insertOptions: true,
      right: true,
      hidden: false
    }
  }
}

export default Document

export const isCacheable = true

export const attach = Document.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf("document") === -1) {
    Helper.registerHelper("document", () => Document)
  }
}
