export function initializer(next) {
  const runtime = this

  if (runtime.state.get("devInitializerFinished")) {
    next && next.call && next()
    return
  }

  runtime.feature("runtimes/development").enable()

  runtime.state.set("devInitializerFinished", true)

  runtime.mainScript
    .runMainScript()
    .then(() => {
      next && next.call && next()
    })
    .catch(err => {
      runtime.set("mainScriptError", err)
      runtime.error(`Error running mainScript`, { error: err.message })
    })
}
