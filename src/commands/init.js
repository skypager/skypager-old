export function program(p) {
  return p
    .command('init')
    .description('initialize a skypager project')
    .option('--name <name>', 'The name for the project')
    .option('--type <type>', 'which type of project?')
    .option('--overwrite', 'Overwrite any files that exist')
    .option('--npm-client <npmClient>', 'Defaults to yarn, specify npm if you wish to use that')
    .option('--skip-git', "Disable initialization of a git repo when one doesn't exist.")
}

export async function validate() {
  return true
}

export async function prepare() {
  const { runtime } = this

  runtime.feature('auto-discovery').enable()
  await runtime.autoDiscovery.discoverProjectTypes({ register: true })

  return true
}

export async function run() {
  const { runtime } = this

  const availableProjectTypes = runtime.projectTypes.available

  if (!availableProjectTypes.length) {
    this.print('Could not find any available project type templates.')
    process.exit(1)
  }

  if (!runtime.argv.type) {
    this.print('Must specify a --type. Available Options:', 2, 0, 1)
    this.print(availableProjectTypes.map(t => `- ${t}`), 4)
    process.exit(1)
  }

  const name = runtime.get('argv.name', runtime.get('argv._[1]'))

  if (!name) {
    this.print('Must specify a destination. Example:', 2, 0, 1)
    this.print('sky init my-new-project --type semantic-react', 4)
    this.print('or', 4)
    this.print('sky init --name my-new-project --type semantic-react', 4)
    process.exit(1)
  }

  const projectType = runtime.projectType(runtime.argv.type)

  this.print('Applying Project Template', 2)
  await projectType.applyTemplate({
    base: name,
    overwrite: !!runtime.argv.overwrite,
    mergePackage: runtime.argv.mergePackage !== false,
    onWriteFile: relativePath => this.print(`- Writing ${relativePath}`, 4),
    after: () => this.print('Finished!', 2),
  })

  const { npmClient = 'yarn' } = runtime.argv

  this.print('Installing Dependencies', 2)
  await runtime.proc.async.spawn(npmClient, ['install'], {
    cwd: runtime.resolve(name),
    stdio: 'inherit',
  })

  if (!runtime.argv.skipGit) {
    this.print('Initializing Git Repository', 2)
    await runtime.proc.async.spawn('git', ['init'], {
      cwd: runtime.resolve(name),
      stdio: 'inherit',
    })

    await runtime.proc.async.spawn('git', ['add', '-A'], {
      cwd: runtime.resolve(name),
      stdio: 'inherit',
    })

    await runtime.proc.async.spawn('git', ['commit', '-m', 'InitialCommit'], {
      cwd: runtime.resolve(name),
      stdio: 'inherit',
    })
  }
}

export async function initializeDefaultProjectType() {}

export function shouldExit() {
  return true
}

export const shouldSilenceConsole = true
