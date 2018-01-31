export function attach(runtime, options = {}) {
  runtime = runtime || this

  runtime.features.add(require.context('./features', true, /\.js$/))
  runtime.feature('google-sheets').enable(options)
}
