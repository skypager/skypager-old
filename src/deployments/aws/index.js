export function attach(runtime, options = {}) {
  runtime = runtime || this

  if (typeof options === 'string') {
    options = {}
  }

  if (!runtime.deployments) {
    throw new Error(`Must first enable the skypager deployments helper`)
  }

  if (!runtime.aws && runtime.features.available.indexOf('aws') !== -1) {
    runtime.feature('aws', options).enable(options)
  } else if (!runtime.aws && runtime.features.available.indexOf('aws') === -1) {
    runtime.use(require('skypager-features-aws'), 'INITIALIZING', options)
  }

  runtime.deployments.register('aws', () => require('./deployment'))
}
