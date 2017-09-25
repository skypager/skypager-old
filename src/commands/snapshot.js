export function program(p) {
  return p.command("snapshot").description("generate a selector snapshot")
}

export async function validate() {
  return true
}

export async function run() {
  const { runtime } = this
  const { fileManager, packageManager } = runtime
  const selectors = runtime.lodash.castArray(runtime.argv.selector)

  if (runtime.argv.available || runtime.argv._.indexOf("available") >= 0) {
    const list = await runtime.packageCache.findAvailableSnapshots()
    this.print(list)
    return this
  }

  if (selectors.length) {
    if (selectors.find(f => f.startsWith("package") || f.startsWith("file"))) {
      await fileManager.startAsync()
    }

    if (selectors.find(f => f.startsWith("package"))) {
      await packageManager.startAsync()
    }

    const snapshot = await runtime.packageCache.buildSnapshot({
      ...runtime.argv,
      selectors
    })

    await runtime.packageCache.exportSnapshot({
      write: true,
      name: runtime.hashObject({ selectors, uuid: runtime.uuid }),
      selectors,
      ...this.runtime.argv,
      snapshot
    })
  } else {
  }

  return this
}
