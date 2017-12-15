async function main() {
  const { mapValues, omit } = skypager.lodash
  await skypager.fileManager.startAsync()
  await skypager.fileManager.readContent({ rootNode: 'files' })

  const tree = await skypager.select('files/tree', { rootNode: 'files' })
  const json = JSON.stringify(mapValues(tree, file => omit(file, 'dir', 'path')))

  await skypager.fsx.writeFileAsync(skypager.join('tree.json'), json, 'utf8')
}

main()
