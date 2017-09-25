module.exports = chain =>
  chain
    .get("manifest")
    .pick("optionalDependencies", "peerDependencies", "devDependencies", "dependencies")
    .values()
    .reduce((memo, obj) => ({
      ...memo,
      ...obj,
    }))
