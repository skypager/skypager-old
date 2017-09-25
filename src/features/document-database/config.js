export function configFeatures() {
  const { isEmpty, isArray, isFunction, isObject, isString } = skypager.lodash

  return {
    ignore(existing = [], ...args) {
      if (isEmpty(arguments)) return {}
      return [...existing, ...args]
    },

    route(existing = {}, routePattern, handler) {
      if (arguments.length === 0) return

      if (!existing[routePattern]) {
        existing[routePattern] = []
      }

      if (isFunction(handler)) {
        existing[routePattern].push(handler)
      }

      return existing
    }
  }
}

export function configReducers() {
  return {
    ignore(state) {
      return state.ignore
    },

    route(state) {
      return state.route
    }
  }
}
