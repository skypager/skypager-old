const { axios, firebase } = window
const runtime = (module.exports = window.runtime = skypager)

runtime.hide('axios', axios)

// register all of the selectors found in src/selectors
// example: runtime.select('remote-data', options)
runtime.selectors.add(require.context('./selectors', true, /\.js$/))

// register all of the feature modules found in src/features
runtime.features.add(require.context('./features', true, /\.js$/))

runtime.feature('authentication').enable({ provider: 'skypager' })
runtime.feature('data-loading').enable()

runtime.startApp = () =>
  runtime.start().then(() => {
    return runtime
  })
