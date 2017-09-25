export const createGetter = ["vmBindings"]

export function featureWasEnabled() {
  this.start()
}

export function start() {
  const { runtime } = this

  runtime.listenToIPC("CODE_RUNNERS", ({ topic, payload = {}, meta = {} } = {}) => {
    const {
      args = {},
      action,
      code,
      name = runtime.lodash.uniqueId("code-runners"),
      options = {},
      context = {}
    } = payload

    try {
      if (action === "create") {
        return this.createRunner(name, code, options, context).then(runner => ({
          name,
          code,
          options,
          context,
          ...runner
        }))
      } else if (action === "invoke") {
        return Promise.resolve(this.invokeRunner(name, args))
      } else if (action === "exec") {
        return Promise.resolve(this.exec(code, options, context))
      }
    } catch (error) {
      return { error }
    }
  })

  return this
}

export const featureMethods = ["createRunner", "invokeRunner", "start", "exec"]

export function observables() {
  return { codeRunners: ["map", {}] }
}

export async function exec(code, options = {}, ctx = {}) {
  const { runtime } = this
  return runtime.createCodeRunner(code, options, { ...runtime.sandbox, ...ctx })(options.args)
}

export async function createRunner(name, code, options = {}, ctx = {}) {
  const { runtime } = this

  this.codeRunners.set(name, {
    code,
    options,
    runner: runtime.createCodeRunner(code, options, { ...runtime.sandbox, ...ctx })
  })

  return this.codeRunners.get(name)
}

export async function invokeRunner(name, ...args) {
  const { runner } = this.codeRunners.get(name)
  return await runner(...args)
}

export const featureMixinOptions = {
  partial: [],
  insertOptions: false
}
