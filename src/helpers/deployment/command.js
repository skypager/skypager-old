export function program(p) {
  return p
    .command('deploy')
    .description('deploy your project')
    .option('--folder', 'which folder contains the contents to be deployed')
    .option('--provider', 'specify a provider for your deployment')
}

export async function prepare(options = {}) {
  await this.runtime.mainScript.whenReady()
  return true
}

export async function run(argv) {
  const { _: args = [] } = this.runtime.argv
  args.shift()

  const availableDeployments = this.runtime.get('deployments.available', [])

  if (args[0] === 'available' || argv.available) {
    this.print(`Available Deployments:`, 2)
    this.print(availableDeployments, 4)
    process.exit(0)
  }
}
