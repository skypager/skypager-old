export const shortcut = 'navigation'

export function featureWasEnabled() {
  const { runtime } = this

  runtime.listenToIPC('NAVIGATION', ({ payload }) => {
    const { location } = payload
    runtime.navigate(location)
  })
}
