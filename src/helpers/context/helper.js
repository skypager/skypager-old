import { Helper } from "skypager-runtime"

export class Context extends Helper {
  static isCacheable = true

  static dirname = __dirname

  static attach(runtime, options = {}) {
    if (!runtime.has("contexts")) {
      Context.attach(runtime)
    }

    return Helper.attach(runtime, Context, {
      registryProp: "contexts",
      lookupProp: "buildContext",
      cacheHelper: true,
      isCacheable: true,
      registry:
        options.registry ||
          Helper.createContextRegistry("contexts", {
            context: Helper.createMockContext(),
          }),
      ...options,
    })
  }

  get matchingContextTypes() {
    return []
  }
}

export default Context

export const isCacheable = true

export const attach = Context.attach

export const registerHelper = () => {
  if (Helper.registry.available.indexOf("context") === -1) {
    Helper.registerHelper("context", () => Context)
  }
}
