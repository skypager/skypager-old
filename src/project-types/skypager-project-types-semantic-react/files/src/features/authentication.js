export function featureWasEnabled(options = {}) {
  const { runtime } = this
  const { provider = 'skypager' } = options

  if (provider === 'skypager') {
    runtime.feature('authentication/skypager').enable(options)
  }
}
