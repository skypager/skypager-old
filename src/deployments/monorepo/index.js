export function attach(runtime, options = {}) {
  runtime = runtime || this

  if (!runtime.deployments) {
    throw new Error(`Must first enable the skypager deployments helper`)
  }

  runtime.use(require('skypager-features-lerna-adapter'))

  runtime.deployments.register('monorepo', () => require('./deployment'))
}
