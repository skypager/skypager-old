import reduce from "lodash/reduce"
import castArray from "lodash/castArray"

const toArray = exts =>
  reduce(
    exts,
    (acc, loaders, ext) => {
      const test = new RegExp(`${ext.replace(".", "\\.")}$`)

      return [
        ...acc,
        ...loaders.map(loader => ({
          test,
          ...loader,
        })),
      ]
    },
    [],
  )

export default function moduleReducer(state) {
  const { loader, preLoader, target, skip } = state

  const base = {
    loaders: toArray(loader),
    preLoaders: toArray(preLoader),
    noParse: skip.reduce((memo, list) => memo.concat(castArray(list)), []),
  }

  if (target.match(/node$/) || target.match(/electron-main/)) {
    base.exprContextRegExp = /$^/
    base.exprContextCritical = false
  }

  return base
}
