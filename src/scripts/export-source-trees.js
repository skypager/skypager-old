async function exportRoot(rootNode) {
  if (rootNode === '.' || skypager.resolve(rootNode) === skypager.cwd) {
    return {}
  }

  print(`Exporting ${rootNode}`)

  await skypager.select('files/asts', { rootNode })
  const source = await skypager.select('files/tree', { rootNode })
  const manifest = skypager.fsx.readJsonSync(skypager.resolve(rootNode, 'package.json'))

  const data = {
    id: rootNode,
    manifest,
    source,
  }

  print(`Exported ${manifest.name}@${manifest.version}`, 2)

  await skypager.fsx.mkdirpAsync(
    skypager.join('dist', 'src-bundles', manifest.name, manifest.version)
  )
  await skypager.fsx.writeJsonAsync(
    skypager.join('dist', 'src-bundles', manifest.name, manifest.version, 'source-bundle.json'),
    data
  )

  return data
}

async function main() {
  print('Discovering package locations')

  const include = []

  if (skypager.argv.exclude) {
    include.push(
      ...skypager.lodash
        .castArray(skypager.argv.exclude)
        .map(val => new RegExp(val))
        .map(pattern => val => !pattern.test(val))
    )
  }

  if (skypager.argv.include) {
    include.push(
      ...skypager.lodash
        .castArray(skypager.argv.include)
        .map(val => new RegExp(val))
        .map(pattern => val => pattern.test(val))
    )
  }

  const packageLocations = await skypager.select('package/locations', {
    include,
    exclude: [/skypager-repl$/, /containers/, /apps/, /bootstrap-themes/],
  })

  await Promise.all(packageLocations.map(exportRoot)).catch(error => {
    print(`Error!`)
    print(error.message)
    process.exit(1)
  })

  print('Exported Source Trees')
  print(packageLocations, 4)
}

main().then(() => process.exit(0))
