export function program(p) {
  return p
    .command('snapshot')
    .description('generate a selector snapshot')
    .option('--available', 'prints out the available snapshots')
    .option('--selector', 'specify a selector to use to generate the data. can specify multiple.')
    .option('--output-file-name', 'specify which path to save the snapshot data to')
    .option('--silent', 'do not output anything to the console')
    .option('--pretty', 'pretty print JSON output')
}

export async function validate() {
  return true
}

export async function run() {
  const { runtime } = this
  const { fileManager, packageManager } = runtime
  const selectors = runtime.lodash.castArray(runtime.argv.selector)

  if (runtime.argv.available || runtime.argv._.indexOf('available') >= 0) {
    const list = await runtime.packageCache.findAvailableSnapshots()
    this.print(list)
    return this
  }

  if (selectors.length) {
    if (selectors.find(f => f.startsWith('package') || f.startsWith('file'))) {
      await fileManager.startAsync()
    }

    if (selectors.find(f => f.startsWith('package'))) {
      await packageManager.startAsync()
    }

    const snapshot = await runtime.packageCache.buildSnapshot({
      ...runtime.argv,
      selectors,
    })

    await runtime.packageCache.exportSnapshot({
      write: true,
      name: runtime.hashObject({ selectors, uuid: runtime.uuid }),
      selectors,
      ...this.runtime.argv,
      snapshot,
    })

    const stringified = runtime.argv.pretty
      ? JSON.stringify(snapshot, null, 2)
      : JSON.stringify(snapshot)

    if (runtime.argv.outputFileName) {
      await runtime.fsx.writeFileAsync(
        runtime.resolve(runtime.argv.outputFileName),
        stringified,
        'utf8'
      )
    } else if (!runtime.argv.silent) {
      console.log(stringified)
    }
  } else {
    console.error('Must specify one or more selectors via the --selector option')
  }

  return this
}
