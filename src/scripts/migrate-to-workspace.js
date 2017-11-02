const { runtime } = this
const { fsx } = runtime

const res = (...args) => runtime.resolve(...args)

async function moveFiles(name) {
  const { flatten } = skypager.lodash
  const srcPath = res('modules', name, 'src')
  const fileNames = fsx
    .readdirSync(srcPath)
    .filter(fileName => fileName.match(/\./))
    .filter(
      fileName => fileName === 'skypager.js' || fileName.startsWith('.') || !fileName.match(/\.js$/)
    )

  fileNames.forEach(fileName => {
    const fullPath = res(srcPath, fileName)
    const destination = res('modules', name, fileName)
    print(`mv ${fullPath} ${destination}`)
  })
}

async function prepare() {
  await fsx.mkdirpAsync(res('modules'))
  const sourceList = await buildSourcesList()

  const names = sourceList.map(v => v.name)

  //print('Exporting:')
  //print(names, 4)

  try {
    await Promise.all(names.map(name => fsx.mkdirpAsync(res('modules', name))))
    await Promise.all(
      sourceList.map(({ packagePath, src, name } = {}) =>
        fsx.copyAsync(src, res('modules', name, 'src'))
      )
    )
  } catch (error) {
    print(`# Error making dirs: ${error.message}`)
  }

  try {
    await Promise.all(names.map(name => moveFiles(name)))
  } catch (e) {
    console.log(e)
  }

  return true
}

async function buildSourcesList() {
  const sourceList = skypager.chain
    .invoke('packageManager.manifests.toJSON')
    .keyBy('name')
    .omit('skypager')
    .omitBy((v, name) => name.match(/skypager-(apps|containers)-/i))
    .mapValues((pkg, name) => {
      const { path: packagePath, dir: src } = pkg._file

      return { packagePath, src, name }
    })
    .values()

  return sourceList.value()
}

prepare().then(() => {
  process.exit(0)
})
