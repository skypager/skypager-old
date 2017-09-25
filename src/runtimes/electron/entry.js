const skypager = require("skypager-runtimes-electron/main")

skypager.hide("electronMainRoot", __dirname)

global.skypagerElectronMain = skypager

if (process.argv[0].match(/electron$/i)) {
  require("skypager-runtimes-development")
}

skypager.debug("Skypager Electron Entry Point", {
  argv: skypager.argv,
  cwd: skypager.cwd
})

/*
if (skypager.argv._.length) {
  const entryArg = skypager.get("argv._[0]")
  const entryPath =
    entryArg && skypager.fsx.existsSync(skypager.resolve(entryArg)) && skypager.resolve(entryArg)

  if (entryPath) {
    loadEntry(entryPath).then(() => skypager.start())
  } else {
    skypager.start().then(() => {})
  }
}
*/

async function start() {
  if (skypager.argv.entry) {
    await loadEntry(skypager.resolve(skypager.argv.entry))
  }

  if (skypager.get("argv._", []).length) {
    const validPaths = skypager.argv._
      .map(p => skypager.resolve(p))
      .filter(f => skypager.fsx.existsSync(f))

    if (validPaths.length) {
      skypager.debug("valid paths", { validPaths })
    }
  } else if (!skypager.argv.entry) {
    skypager.debug("show welcome")
  }

  if (skypager.get("argv.interactive") || skypager.get("argv.repl")) {
    const repl = skypager.repl("interactive")
    await repl.launch()
  }
}

async function loadEntry(entryPath) {
  const stat = await skypager.fsx.statAsync(entryPath)

  if (stat.isDirectory()) {
    return this
  }

  const code = await skypager.fsx.readFileAsync(entryPath).then(b => b.toString())

  const runner = skypager.createCodeRunner(code, { thisContext: true })

  await runner().catch(error => {
    skypager.error(`Error while running entry at ${entryPath}`, { error: error.message })
    return { error }
  })

  return skypager
}

start()
  .catch(e => skypager.error(`Error`, { message: e.message }))
  .then(() => skypager.invoke("debug", "started"))
