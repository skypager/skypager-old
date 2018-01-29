export function attach(runtime, options = {}) {
  runtime = runtime || this

  if (!runtime.deployments) {
    throw new Error(`Must first enable the skypager deployments helper`)
  }

  runtime.features.add(require.context('./features', true, /\.js$/))
  runtime.feature('aws').enable()

  runtime.deployments.register('aws', () => require('./deployment'))
}
