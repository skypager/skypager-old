/* prettier-disable */

async function prod() {
  const { print } = skypager.cli

  const compiler = await skypager.compiler("prod", {
    entry: {
      app: [skypager.join("src", "index.web.js")]
    }
  })

  if (!compiler.isConfigValid) {
    print("Compiler configuration is invalid", 4)
    print(compiler.configValidationMessages, 8)
  }

  await compiler.run()

  clear()
  print(compiler.stringifyStats({ colors: true }), 8, 2, 2)
  print("\n\n\n", 2, 2, 2)
}

prod()
