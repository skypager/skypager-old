import vm from 'isomorphic-vm'
import { Module } from 'module'

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
  const wrapped = `(function (exports, require, module, __filename, __dirname) {\n\n${code}\n\n});`
  const script = this.createScript(wrapped)
  const context = this.createContext(sandbox)

  const filename = options.filename || this.resolve(this.hashObject({ code }) + '.js')
  const id = options.id || filename
  const dirname = options.dirname || this.cwd || '/'

  const newModule = new Module(id)
  const req = options.require || this.get('currentModule.require')
  newModule.require = req

  const moduleLoader = () =>
    script.runInContext(context)(newModule.exports, newModule.require, newModule, filename, dirname)

  if (options.lazy) {
    return moduleLoader
  } else {
    moduleLoader()
    return newModule
  }
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
        usedContext: vmContext ? 'vmContext' : thisContext ? 'thisContext' : 'sandboxedContext',
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
