export function prepare(options = {}) {
  const { runtime } = this
  const { castArray, flatten, uniq, compact } = runtime.lodash

  const { inject = [], headScripts = [], dllScripts = [], stylesheets = [] } = {
    ...this.options,
    ...options
  }

  this.headScripts = uniq(
    flatten(
      compact([
        "https://cdn.skypager.io/vendor/jquery.min.js",
        "https://cdn.skypager.io/vendor/tether.min.js",
        ...castArray(headScripts)
      ])
    )
  )

  this.dllScripts = uniq(
    flatten(
      compact([
        "https://cdn.skypager.io/themes/dashboard/toolkit.min.js",
        ...castArray(dllScripts),
        ...castArray(inject)
      ])
    )
  )

  this.stylesheets = uniq(
    flatten(
      compact([
        "https://cdn.skypager.io/themes/dashboard/toolkit-inverse.min.css",
        ...castArray(stylesheets)
      ])
    )
  )
}
