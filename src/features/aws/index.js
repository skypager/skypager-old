export function attach(runtime, options = {}) {
  runtime = runtime || this
  options = runtime.lodash.defaults({}, options, runtime.options.aws, runtime.options)

  runtime.features.add(require.context('./features', true, /\.js$/))
  runtime.feature('aws', options).enable(options)
}
