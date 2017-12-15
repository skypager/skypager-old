/**
  Attempting to migrate off the dependency on skypager-framework old version for
  the library build tooling.
*/
async function main() {
  await skypager.fileManager.startAsync()
  await skypager.packageManager.startAsync()

  try {
    const webpacks = skypager.requireContext('webpacks/*')
    const child = await spawnChildRuntime()

    child.webpacks.add(webpacks)

    const compiler = await child.compiler('dev', {
      entry: child.get('currentPackage.compilers.package.entryPoints', {
        index: child.join('index.js'),
      }),
      outputPath: skypager.join('new-packages', child.currentPackage.name),
    })

    await compiler.run()

    if (compiler.wasSuccessful) {
      print(`Saved to ${compiler.outputPath}`)
      print(compiler.stringifyStats('minimal'), 8)

      await skypager.fsx.writeFileAsync(
        skypager.pathUtils.join(compiler.outputPath, 'package.json'),
        JSON.stringify(child.currentPackage, null, 2),
        'utf8'
      )
    } else {
      print(compiler.stringifyStats('errors-only'), 8)
    }
  } catch (error) {
    console.log(error)
  }
}

async function spawnChildRuntime() {
  const pkg = skypager.get('argv._[2]', skypager.argv.name)

  if (!pkg) {
    print('Must specify a package')
    process.exit(1)
  }

  const info = skypager.packageManager.findByName(pkg)
  const cwd = info && info._file && info._file.dir

  if (!cwd) {
    print('Could not find package by that name: ' + pkg)
    process.exit(1)
  }

  print(cwd)

  const child = new skypager.Runtime({ cwd })

  return child.use('runtimes/node').use('runtimes/development')
}

main()
