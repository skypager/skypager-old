if (typeof global.__non_webpack_require__ === 'undefined') {
  global.__non_webpack_require__ = module.require
}

export function program(p) {
  return p
    .command('open')
    .description('open a skypager file or project')
    .option('--entry <entryPoint>', 'which script to use as the electron main entry point')
    .option('--available', 'List any available applications')
    .option('--dev', 'Open the application in development mode (with HMR)')
}

export async function prepare() {
  try {
    await this.runtime.autoDiscovery.discoverApps()
  } catch (e) {}
}

export async function validate() {
  return true
}

export function shouldExit() {
  return false
}

export function resolveEntryPath(...args) {
  const asModule = this.runtime.packageFinder.attemptResolve(...args)

  if (asModule) {
    return asModule
  }

  try {
    const checkPath = this.runtime.resolve(...args)
    if (this.runtime.fsx.existsSync(checkPath)) {
      return checkPath
    } else {
      return false
    }
  } catch (error) {
    return false
  }
}

export function checkRuntime(runtime) {
  try {
    return !!runtime.packageFinder.attemptResolve(`electron`)
  } catch (error) {
    return false
  }
}

export async function run(options = {}) {
  const { runtime } = this
  const { defaults } = this.lodash
  const { spawn } = runtime.proc
  const electron = runtime.packageFinder.attemptResolve('electron')

  if (!electron) {
    this.print(
      `The skypager open command depends on having electron installed. Please install it globally.`
    )
    process.exit(1)
  }

  const resolve = resolveEntryPath.bind(this)

  if (skypager.argv.available) {
    this.print('Available applications:', 2, 1, 1)
    this.print(skypager.autoDiscovery.discoveredApps.map(a => `- ${a}`), 4)
    process.exit(0)
  }

  const entryPath = skypager.chain
    .get('argv._', [])
    .slice(1)
    .map(input => (input === 'desktop-editor' ? 'skypager-apps-desktop-editor' : input))
    .map(p => resolve(p))
    .find(v => v)
    .value()

  const electronArgs = [
    entryPath,
    '--require',
    runtime.packageFinder.attemptResolve('skypager-runtimes-electron/entry.js'),
    ...process.argv.slice(3),
  ]

  try {
    const child = spawn(__non_webpack_require__(electron), electronArgs, {
      stdio: 'inherit',
      env: defaults({}, process.env, {
        SKYPAGER_DEV: !!runtime.argv.dev,
        ELECTRON_NO_ASAR: true,
      }),
    })

    child.on('close', function(code) {
      process.exit(code)
    })
  } catch (error) {
    runtime.error(`Error launching electron`, {
      message: error.message,
    })
  }

  return this
}

export async function displayHelp() {
  console.log('RUN HELP')
}
