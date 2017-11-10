export function initializer(next) {
  const runtime = this

  if (runtime.state.get('devInitializerFinished')) {
    next && next.call && next()
    return
  }

  if (!runtime.isFeatureEnabled('runtimes/node')) {
    runtime.feature('runtimes/node').enable()
  }

  runtime.feature('runtimes/development').enable()

  runtime.state.set('devInitializerFinished', true)

  runtime.mainScript
    .runMainScript()
    .then(() => {
      next && next.call && next()
    })
    .catch(err => {
      runtime.set('mainScriptError', err)
      runtime.error(`Error running mainScript`, { error: err.message })

      if (runtime.argv.safeMode) {
        console.error(`Error while running skypager main script. ${err.message}`)
        process.exit(1)
      }
    })
}
