export default function externals(state) {
  const { externals } = state
  const { externalizeAll = this.get("project.argv.externalizeAll") } = this.options

  return externalizeAll ? [/^[a-z\-0-9]+$/] : externals
}
