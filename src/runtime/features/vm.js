import vm from 'isomorphic-vm'

export const hostMethods = [
  'createCodeRunner',
  'createModule',
  'createScript',
  'createContext',
  'getVm',
]

export function getVm() {
  return vm
}

export function createModule(code, options = {}, sandbox) {
  sandbox = sandbox || this.sandbox
}

export function createContext(options = {}) {
  return vm.createContext({
    ...this.sandbox,
    ...options,
  })
}

export function createCodeRunner(code, options = {}, sandbox) {
  const { thisContext = false } = options
  const { hashObject } = this.propUtils

  sandbox = sandbox || this.sandbox

  const vmContext = (vm.isContext ? vm.isContext(sandbox) : false)
    ? sandbox
    : !thisContext && vm.createContext(sandbox)

  return async function(argv = {}) {
    const throwErrors = options.throwErrors || argv.throwErrors

    const script =
      typeof code === 'function'
        ? vm.createScript(
            code.call(this, { displayErrors: true, ...options, ...argv }, sandbox),
            options
          )
        : vm.createScript(code, { displayErrors: true, ...options, ...argv })

    try {
      const result = vmContext
        ? script.runInContext(vmContext)
        : thisContext ? script.runInThisContext() : script.runInNewContext(sandbox)

      return {
        result,
        code,
        hash: hashObject({ code }),
      }
    } catch (error) {
      if (throwErrors) {
        throw error
      }

      return {
        error: {
          message: error.message,
          stack: error.stack,
        },
        code,
      }
    }
  }
}

export function createScript(code = '', options = {}) {
  return new vm.Script(code.toString(), options)
}
