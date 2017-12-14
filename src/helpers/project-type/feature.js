export function featureWasEnabled() {
  const { runtime } = this

  runtime.projectTypes.register('standard', () => require('skypager-project-types-standard'))
}
