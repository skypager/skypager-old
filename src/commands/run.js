export function program(p) {
  return p
    .command('run-dev')
    .description('runs a script or helper')
    .option('--id <id>', 'which script to run')
    .option('--npm', 'use an npm script')
    .option('--yarn', 'use yarn as your task runner instead of npm')
    .option('--watch', 'watch the script for changes and rerun')
    .option('--fail-silently', 'whether or not to throw errors in the scripts')
    .option(
      '--exit',
      'whether to automatically exit when the script is finished running. defaults to false, lets your script decide'
    )
    .option(
      '--scripts-prefix',
      'what is the folder name all scripts can be found in; defaults to scripts'
    )
    .option('--scripts-extension', 'defaults to .js')
}

export function shouldExit() {
  if (this.argv.watch) {
    return false
  }

  return this.runtime.argv.exit !== false
}

export async function validate() {
  return true
}

export function shouldClear() {
  return !!this.argv.clear
}

export async function run() {
  const { runtime } = this
  const { print, colors } = runtime.cli
  const { argv, fileManager } = runtime
  const { id = argv.scriptId, npm = false, yarn = false, watch = false } = argv
  const script = id || argv._.slice(1)[0] || 'start'
  const isPackageScript = !!runtime.get(['currentPackage', 'scripts', script])
  const raiseErrors = !argv.failSilently

  await fileManager.startAsync()

  let results

  const scriptRunner = runtime.feature('script-runner')

  const matchingFiles = await scriptRunner.findMatchingScripts({
    script: escape(script),
    scriptsPrefix: runtime.get('argv.scriptsPrefix', 'scripts'),
    scriptsExtension: runtime.get('argv.scriptsExtension', '.js'),
  })

  // it is a package script and they did specify
  if (isPackageScript && (npm || yarn)) {
    print('Running a package script: ' + script)
    print(runtime.currentPackage.get(['scripts', script]))
    results = await scriptRunner.runPackageScript(script).catch(error => {
      return { error, exitCode: 1 }
    })
    // it is a package script and also a file, so were confused
  } else if (isPackageScript && (!npm && !yarn) && matchingFiles.length) {
    print('We found both an npm package script and a file by the name of ' + script)
    print('please specify the --npm or --yarn flag to run that.  We will run the script file')
    print(matchingFiles[0])
    results = await scriptRunner
      .runScriptAtPath({
        script: runtime.fileManager.file(matchingFiles[0]).path,
        raiseErrors,
      })
      .catch(error => {
        return { error, exitCode: 1 }
      })
    // it is a package script and they didnt neeed to specify
  } else if (isPackageScript && (!npm && !yarn) && !matchingFiles.length) {
    results = await scriptRunner.runPackageScript({ script, raiseErrors }).catch(error => {
      return { error, exitCode: 1 }
    })
    // we found a script by name
  } else if (matchingFiles.length === 1) {
    results = await scriptRunner
      .runScriptAtPath({
        script: runtime.fileManager.file(matchingFiles[0]).path,
        raiseErrors,
      })
      .catch(error => {
        return { error, exitCode: 1 }
      })
    // we found more than one script
  } else if (matchingFiles.length > 1) {
    print(colors.red('Found more than one matching script. Please be more specific'))
    process.exit(1)
    // we found no scripts and it isn't a package script
  } else if (!matchingFiles.length && !isPackageScript) {
    if (argv.debug) {
      print(colors.yellow(`Could not find a script.`))
      print(`Attempting to run code:`, 2, 1, 1)
      print(argv._.slice(1).join(' '), 4)
    }

    let code

    if (!process.stdin.isTTY) {
      code = await readStdin()
    } else {
      code = argv.code || argv._.slice(1).join(' ')
    }

    results = await scriptRunner
      .runCode({ code, ...argv })
      .then(results => {
        if (results.error) {
          return results
        }
      })
      .catch(error => ({ error }))
  }

  if (watch) {
    print('Watch mode not implemented')

    if (!isPackageScript && matchingFiles.length) {
    } else if (isPackageScript) {
    }

    process.exit(0)
  }

  if (results && results.error && !argv.failSilently) {
    print(colors.red('Script Error:'))
    print(results.error.message, 2, 1, 0)
    print(colors.red('Stack Trace'), 2, 1, 0)
    print(results.error.stack, 6)
    process.exit(results.exitCode || 1)
  } else if (results && results.error && argv.failSilently) {
    process.exit(results.exitCode || 1)
  } else if (results && !results.error && argv.exit) {
    process.exit(0)
  }

  return results
}

export async function displayHelp() {}

function readStdin() {
  let data = ''

  return new Promise((resolve, reject) => {
    process.stdin.on('readable', () => {
      const input = process.stdin.read()

      if (input !== null) {
        data = data + input.toString()
      }
    })

    process.stdin.on('end', () => {
      resolve(data)
    })
  })
}
