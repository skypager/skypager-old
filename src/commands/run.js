export function program(p) {
  return p
    .command('run-dev')
    .description('runs a script or helper')
    .option('--id <id>', 'which script to run')
    .option('--npm', 'use an npm script')
    .option('--yarn', 'use yarn as your task runner instead of npm')
    .option('--watch', 'watch the script for changes and rerun')
}

export function shouldExit() {
  if (this.argv.watch) {
    return false
  }
  return true
}

export async function validate() {
  return true
}

export function shouldClear() {
  return !this.argv.noClear || this.argv.clear !== false
}

export async function run() {
  const { id = this.runtime.argv.scriptId, npm, yarn = false, watch = false } = this.runtime.argv
  const script = id || this.runtime.argv._.slice(1)[0] || 'start'
  const isPackageScript = !!this.runtime.get(['currentPackage', 'scripts', script])

  await this.runtime.fileManager.startAsync()

  let results

  const scriptRunner = this.runtime.feature('script-runner')

  const matchingFiles = await scriptRunner.findMatchingScripts({
    script: escape(script),
    scriptsPrefix: this.runtime.get('argv.scriptsPrefix', 'scripts'),
    scriptsExtension: this.runtime.get('argv.scriptsExtension', '.js'),
  })

  // it is a package script and they did specify
  if (!!isPackageScript && (npm || yarn)) {
    this.print('Running a package script: ' + script)
    this.print(this.runtime.currentPackage.get(['scripts', script]))
    results = await scriptRunner.runPackageScript(script)
    // it is a package script and also a file, so were confused
  } else if (isPackageScript && (!npm && !yarn) && matchingFiles.length) {
    this.print('We found both an npm package script and a file by the name of ' + script)
    this.print('please specify the --npm or --yarn flag to run that.  We will run the script file')
    this.print(matchingFiles[0])
    results = await scriptRunner.runScriptAtPath(
      this.runtime.fileManager.file(matchingFiles[0]).path
    )
    // it is a package script and they didnt neeed to specify
  } else if (isPackageScript && (!npm && !yarn) && !matchingFiles.length) {
    this.print('We found both an npm package script and a file by the name of ' + script)
    results = await scriptRunner.runPackageScript(script)
    // we found a script by name
  } else if (matchingFiles.length === 1) {
    results = await scriptRunner.runScriptAtPath(
      this.runtime.fileManager.file(matchingFiles[0]).path
    )
    // we found more than one script
  } else if (matchingFiles.length > 1) {
    this.print('Found more than one matching script. Please be more specific')
    // we found no scripts and it isn't a package script
  } else if (!matchingFiles.length && !isPackageScript) {
    this.print('couldnt find any script. Running code: ' + this.runtime.argv._.slice(1).join(' '))
  }

  if (watch && !isPackageScript && matchingFiles.length) {
    this.print('watching files')
  } else if (watch && isPackageScript) {
    this.print('Watch mode only works when dealing with scripts')
  }

  return results
}

export async function displayHelp() {}
