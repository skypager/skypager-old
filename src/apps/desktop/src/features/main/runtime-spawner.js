/**
  IDEA: The Electron Main Runtime should be able to spawn child runtimes in other projects
*/
const cache = new Map()

export const createGetter = 'runtimeSpawner'

export const featureMethods = ['spawnDevelopment', 'spawnNode']

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export async function spawnDevelopment(cwd, argv) {
  const nodeRuntime = await this.spawnNode(cwd, argv)

  return nodeRuntime.use('skypager-runtimes-development')
}

export async function spawnNode(cwd, argv = {}) {
  const { runtime } = this

  if (cache.has(cwd)) {
    return cache.get(cwd)
  }

  const nodeRuntime = runtime.spawn(Object.assign({}, { cwd }, argv))

  cache.set(cwd, nodeRuntime)

  return nodeRuntime
}
