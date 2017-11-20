export function initializer(next) {
  const runtime = this

  if (runtime.argv.profile) {
    runtime.profiler.profileStart('developmentRuntimeEnabled')
  }

  if (runtime.state.get('devInitializerFinished')) {
    next && next.call && next()
    return
  }

  if (!runtime.isFeatureEnabled('runtimes/node')) {
    runtime.feature('runtimes/node').enable()
  }

  runtime.feature('runtimes/development').enable()

  runtime.state.set('devInitializerFinished', true)

  if (runtime.argv.profile) {
    runtime.profiler.profileEnd('developmentRuntimeEnabled')
  }
}
