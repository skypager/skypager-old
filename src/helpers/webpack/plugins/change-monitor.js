import isFunction from "lodash/isFunction"

export class ChangeMonitorPlugin {
  constructor(changeHandler, debounceValue = 100) {
    if (!isFunction(changeHandler)) {
      throw "ChangeMonitorPlugin requires a changeHandler option"
    }

    this.changeHandler = changeHandler
    this.startTime = Date.now()
    this.chunkVersions = {}
    this.prevTimestamps = {}
  }

  apply(compiler) {
    compiler.plugin("emit", (compilation, callback) => {
      const changedChunks = compilation.chunks.filter(chunk => {
        const oldVersion = this.chunkVersions[chunk.name]
        this.chunkVersions[chunk.name] = chunk.hash
        return chunk.hash !== oldVersion
      })

      const changedFiles = Object.keys(compilation.fileTimestamps).filter(watchfile => {
        ;(this.prevTimestamps[watchfile] || this.startTime) < (compilation.fileTimestamps[watchfile] || Infinity)
      })

      if (changedChunks.length > 0 && changedFiles.length > 0) {
        this.changeHandler(changedChunks, changedFiles, this.chunkVersions, compilation, callback)
      } else {
        callback()
      }
    })
  }
}

export default ChangeMonitorPlugin
