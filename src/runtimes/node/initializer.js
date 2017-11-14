/**
  This initializer is used by the global skypager runtime to tap into the
  initialization cycle and add the core
*/
export function initializer(next) {
  const runtime = this

  if (runtime.state.get('initializerFinished')) {
    next && next.call && next()
    return
  }

  runtime.feature('runtimes/node').enable()

  runtime.state.set('initializerFinished', true)

  runtime.mainScript
    .runMainScript()
    .then((result = {}) => {
      next && next.call && next()
    })
    .catch(err => {
      runtime.set('mainScriptError', err)
      runtime.error(`Error running mainScript`, { error: err.message })
      next && next.call && next(err)
    })
}
