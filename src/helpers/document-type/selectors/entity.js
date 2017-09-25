import mapValues from "lodash/mapValues"
import pickBy from "lodash/pickBy"
import isFunction from "lodash/isFunction"
import bindAll from "lodash/bindAll"

module.exports = function(chain, api = {}) {
  const doc = this
  const entity = selectEntity(doc)

  const mixin = mapValues(pickBy(api, isFunction), (meth, id) => meth.bind(doc))

  return bindAll(Object.assign(entity, mixin))
}

function selectEntity(doc) {
  try {
    if (typeof doc.createExportable === "function") {
      return doc.exporter
        .invoke("createExportable")
        .defaults({ id: doc.id, baseRelativePath: doc.baseRelativePath, relativeDirname: doc.relativeDirname })
    } else if (typeof doc.toProjectConfiguration === "function") {
      return doc.exporter
        .invoke("toProjectConfiguration")
        .defaults({ id: doc.id, baseRelativePath: doc.baseRelativePath, relativeDirname: doc.relativeDirname })
    } else if (typeof doc.readDataSync === "function") {
      return doc.exporter
        .invoke("readDataSync")
        .defaults({ id: doc.id, baseRelativePath: doc.baseRelativePath, relativeDirname: doc.relativeDirname })
    } else {
      return doc.exporter
        .pick("id", "relativeDirname", "baseRelativePath", "idParts", "cacheKey", "file", "data")
        .defaults({ id: doc.id, baseRelativePath: doc.baseRelativePath, relativeDirname: doc.relativeDirname })
    }
  } catch (error) {
    return doc.chain.pick("id", "baseRelativePath", "relativeDirname", "idParts", "file", "data").assign({ error })
  }
}
