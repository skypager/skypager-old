async function main() {
  await skypager.fileManager.startAsync()
  await skypager.fileManager.readContent({ rootNode: 'files' })

  const tree = await skypager.select('files/tree', { rootNode: 'files' })
  const json = JSON.stringify(tree)

  await skypager.fsx.writeFileAsync(skypager.join('src', 'tree.json'), json, 'utf8')
}

main()

