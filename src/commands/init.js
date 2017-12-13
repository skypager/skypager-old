export function program(p) {
  return p
    .command('init')
    .description('initialize a skypager project')
    .option('--name <name>', 'The name for the project')
    .option('--type <type>', 'which type of project?')
    .option('--overwrite', 'Overwrite any files that exist')
    .option('--skip-git', "Disable initialization of a git repo when one doesn't exist.")
}

export async function validate() {
  return true
}

export async function prepare() {
  const { runtime } = this
}

export async function run() {
  const { runtime } = this

  if (!runtime.argv.type) {
    this.print('Initializing Default Project Type')
  } else {
    console.log('GOT A TYPE', this.argv.type)
  }
}

export async function initializeDefaultProjectType() {}

export function shouldExit() {
  return true
}

export const shouldSilenceConsole = true
