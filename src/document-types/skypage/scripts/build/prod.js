/* prettier-disable */

async function prod() {
  const { print } = skypager.cli

  const fCompiler = await skypager.compiler('prod', {
    moduleLocations: [skypager.join('src'), 'node_modules'],
  })

  if (!fCompiler.isConfigValid) {
    print('Compiler configuration is invalid', 4)
    print(fCompiler.configValidationMessages, 8)
  }

  if (skypager.argv.watch) {
    fCompiler.watch({ aggregateTimeout: 400 }, err => {
      if (!err) {
        print('Compiler watch OK')
      }
    })
  } else {
    await fCompiler.run()
    print(fCompiler.stringifyStats({ colors: true, reasons: skypager.argv.debug, modules: skypager.argv.verbose || skypager.argv.debug }), 8, 2, 2)
  }
}

prod()
