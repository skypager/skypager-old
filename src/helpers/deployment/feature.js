export function featureWasEnabled() {
  const { runtime } = this

  runtime.commands.register('deploy', () => require('./command'))
}
