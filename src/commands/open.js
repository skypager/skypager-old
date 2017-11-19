if (typeof __non_webpack_require__ === 'undefined') {
  global.__non_webpack_require__ = require
}

export function program(p) {
  return p.command('open').description('open a skypager file or project')
}

export async function validate() {
  return true
}

export function shouldExit() {
  return false
}

export function checkRuntime(runtime) {
  try {
    return !!runtime.packageFinder.attemptResolve(`electron`)
  } catch (error) {
    return false
  }
}

/**
  The Open command spawns an electron process using the same technique
  as the electron command.  It uses the skypager electron runtime as the
  main entry point, and uses the skypager virtual machine to load the entry
  point of a requested application.

  The original idea was to have a library of multiple applications based on the skypager runtime,
  and load that application in the context of a skypager development runtime.
*/
export async function run(options = {}) {
  const { runtime } = this

  const electron = runtime.packageFinder.attemptResolve('electron')

  const proc = require('child_process')

  try {
    const child = proc.spawn(
      __non_webpack_require__(electron),
      [
        __non_webpack_require__.resolve('skypager-runtimes-electron/entry.js'),
        ...process.argv.slice(3),
      ],
      { stdio: 'inherit' }
    )

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
