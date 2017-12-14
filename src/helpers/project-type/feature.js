export function featureWasEnabled() {
  const { runtime } = this

  runtime.projectTypes.register('standard', () =>
    __non_webpack_require__('skypager-project-types-standard')
  )
}
