import castArray from "lodash/castArray"
import isFunction from "lodash/isFunction"

export const getModuleFolders = (options = {}) => {
  let { moduleFolders = [] } = options

  if (isFunction(options)) {
    moduleFolders = options()
  }

  return castArray(moduleFolders)
}
