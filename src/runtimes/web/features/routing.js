import { pathMatcher } from "runtime/utils/router"

export const hostMethods = ["applyRoutePattern"]

export const featureMethods = ["getPagesConfig"]

export const createGetter = "routing"

export function getPagesConfig() {
  return this.get("config.pages", {})
}

export function configFeatures() {
  return { page }

  function page(existing, name, opts) {
    if (arguments.length === 0) {
      return
    }

    existing = existing || {}

    if (!name) {
      return existing
    }

    if (typeof opts === "string") {
      opts = { pageId: opts }
    } else if (!opts) {
      opts = { pageId: name }
    }

    return {
      ...existing,
      [name]: {
        ...(existing[name] || {}),
        ...opts
      }
    }
  }
}

export function configReducers() {
  return { pages }

  function pages(state = {}) {
    return {
      default: { pageId: "skypager/DefaultPage" },
      notFound: { pageId: "skypager/NotFound" },
      ...(state.page || {}),
      ...(state.pages || {})
    }
  }
}

export function applyRoutePattern(options = {}) {
  if (typeof options === "string") options = { pathname: options }

  const {
    pathname = options.path || this.get("location.pathname", this.get("history.location.pathname")),
    pattern = "*"
  } = options

  return pathMatcher()(pattern)(pathname)
}

export function featureWasEnabled() {
  const { runtime } = this
  let { history } = runtime

  if (!history) {
    runtime.feature("history").enable()
    history = runtime.history
  }

  runtime.makeObservable(
    {
      routes: [],
      currentPathname: history ? history.location.pathname : "/",
      currentRoute: [
        "computed",
        function() {
          const match = runtime.routePatterns.find(cfg => cfg.test(runtime.currentPathname))

          return {
            params: match ? match.test(runtime.currentPathname) : {},
            route: match ? match : { result: "NotFound", notFound: true },
            pathname: runtime.currentPathname,
            ...(match ? match : { result: "NotFound", notFound: true })
          }
        }
      ],
      routePatterns: [
        "computed",
        function() {
          return runtime.convertToJS(runtime.routes).map(cfg => {
            const [pattern, result] = cfg

            return {
              pattern,
              result,
              test: pathMatcher()(pattern)
            }
          })
        }
      ],

      route: [
        "action",
        function(pattern, result) {
          runtime.routes.push([pattern, result])
          return this
        }
      ],

      updateRoute: [
        "action",
        function(pathname) {
          runtime.currentPathname = pathname
        }
      ]
    },
    runtime
  )

  runtime.on("historyLocationDidChange", ({ pathname = history.location.pathname } = {}) => {
    runtime.debug("historyLocationDidChange", pathname, arguments)
    runtime.updateRoute(pathname)
  })
}
