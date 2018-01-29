export function attach(runtime, options = {}) {
  runtime = runtime || this

  runtime.features.add(require.context('./features', true, /\.js$/))
  runtime.feature('github').enable()
}
