const skypager = require('skypager-runtimes-electron/main')

skypager.hide('electronMainRoot', __dirname)

global.skypagerElectronMain = skypager

if (process.argv[0].match(/electron$/i) && process.env.NODE_ENV !== 'production') {
  require('skypager-runtimes-development')
}

const resolve = (...args) => {
  const asModule = skypager.packageFinder.attemptResolve(...args)

  if (asModule) {
    return asModule
  }

  try {
    const checkPath = skypager.resolve(...args)
    if (skypager.fsx.existsSync(checkPath)) {
      return checkPath
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

const entryPaths = skypager.chain
  .get('argv._', [])
  .map(p => resolve(p))
  .filter(v => v)
  .value()

skypager.debug('Skypager Electron Entry Point', {
  argv: skypager.argv,
  cwd: skypager.cwd,
  entryPaths,
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
    entryPaths.unshift(resolve(skypager.argv.entry))
  }

  if (!entryPaths.length) {
    entryPaths.unshift(resolve('skypager-runtimes-electron/entry.js'))
  }

  await Promise.all(entryPaths.map(p => loadEntry(resolve(p))))

  if (skypager.get('argv.interactive') || skypager.get('argv.repl')) {
    const repl = skypager.repl('interactive')
    await repl.launch({ entryPaths })
  }
}

async function loadEntry(entryPath) {
  skypager.debug('Loading entry', { path: entryPath })

  const stat = await skypager.fsx.statAsync(entryPath)

  if (stat.isDirectory()) {
    return skypager
  }

  try {
    const result = await skypager.scriptRunner.runScriptAtPath({
      script: entryPath,
      throwErrors: true,
      displayErrors: true,
    })
    skypager.debug(`Loaded And Ran Entry`, skypager.lodash.omit(result, 'code'))
    //skypager.debug('Current Module', { currentModule: skypager.currentModule })
  } catch (error) {
    skypager.error(`Error while running ${entryPath}`, {
      message: error.message,
      stack: error.stack,
    })
  }

  return skypager
}

async function loadEntryOld(entryPath) {
  skypager.debug('Loading entry', { path: entryPath })

  const stat = await skypager.fsx.statAsync(entryPath)

  if (stat.isDirectory()) {
    return skypager
  }

  const code = await skypager.fsx.readFileAsync(entryPath).then(b => b.toString())

  const runner = skypager.createCodeRunner(code, { thisContext: true })

  await runner().catch(error => {
    skypager.error(`Error while running entry at ${entryPath}`, { error: error.message })
    process.exit(1)
  })

  skypager.debug('Loaded and ran entry', { entryPath })

  return skypager
}

start().catch(e => {
  skypager.error(`Error`, { message: e.message })
  process.exit(1)
})
