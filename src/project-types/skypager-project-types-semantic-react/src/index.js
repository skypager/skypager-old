export function readTemplateTree() {
  const { runtime } = this

  try {
    const tree = __non_webpack_require__('../tree.json')
    return tree
  } catch (error) {
    return {}
  }
}
