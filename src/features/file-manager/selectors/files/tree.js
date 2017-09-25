export default async function selectFileTree(chain, options = {}) {
  const skypager = this
  const { fileManager } = skypager
  const {
    include = [],
    exclude = [],
    rootNode = "src",
    hashFiles = false,
    readContents = false
  } = options

  await fileManager.whenActivated()

  if (readContents) {
    await fileManager.readContent({
      include: [path => path.startsWith(skypager.resolve(rootNode)), ...include],
      exclude
    })
  }

  if (hashFiles) {
    await fileManager.hashFiles({
      include: [path => path.startsWith(skypager.resolve(rootNode)), ...include],
      exclude
    })
  }

  const fileIds = skypager.fileManager.fileIds.filter(f => f.startsWith(rootNode))

  return chain
    .plant(fileIds)
    .keyBy(v => v)
    .mapValues(fileId => skypager.fileManager.file(fileId))
    .pickBy(v => v)
}
