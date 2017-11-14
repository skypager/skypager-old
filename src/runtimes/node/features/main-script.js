export const createGetter = 'mainScript'

export const featureMethods = [
  'getMainScriptType',
  'getSkypagerMainPath',
  'lazyMainScriptExists',
  'loadMainModule',
  'runMainScript',
  'readMainScript',
  'toModule',
  'toCodeRunner',
]

export function getMainScriptType() {
  return 'script'
}

export function getSkypagerMainPath() {
  const { runtime } = this
  const { main = `skypager.js` } = runtime.argv
  return runtime.resolve(main)
}

export function lazyMainScriptExists() {
  return this.runtime.fsx.existsSync(this.skypagerMainPath)
}

export async function readMainScript() {
  return this.runtime.fsx.readFileAsync(this.skypagerMainPath).then(buf => buf.toString())
}

export async function loadMainModule(options = {}, context = {}) {
  const code = await this.readMainScript()
  return this.toModule(
    {
      code,
      filename: this.skypagerMainPath,
      dirname: this.runtime.pathUtils.dirname(this.skypagerMainPath),
      ...options,
    },
    context
  )
}

export async function runMainScript(options = {}, context = {}) {
  const code = await this.readMainScript()

  if (process.mainModule && process.mainModule.require && process.mainModule.require) {
    context.require = context.require || process.mainModule.require
    context.require.resolve = __non_webpack_require__.resolve
  }

  return this.toCodeRunner({ code, ...options }, context)()
    .then(result => {
      this.runtime.state.set('mainScriptLoaded', true)
      this.runtime.emit('mainScriptDidLoad')
      return result
    })
    .catch(error => {
      this.runtime.state.set('mainScriptError', { message: error.message, stack: error.stack })
      this.runtime.emit('mainScriptDidFail', error)

      return { error }
    })
}

export function toCodeRunner(options = {}, context = {}) {
  const { code = this.runtime.fsx.readFileSync(this.skypagerMainPath).toString() } = options

  return this.runtime.createCodeRunner(code, options, {
    runtime: this.runtime,
    skypager: this.runtime,
    ...this.runtime.slice(
      'pathUtils',
      'lodash',
      'stringUtils',
      'urlUtils',
      'proc',
      'mobx',
      'packageFinder',
      'fileManager',
      'Helper',
      'Runtime'
    ),
    console,
    process,
    get testGlobal() {
      return this
    },
    ...context,
  })
}

export function toModule(options = {}, context = {}) {
  const { code = this.runtime.fsx.readFileSync(this.skypagerMainPath).toString() } = options
  return this.runtime.createModule(code, options, context)
}
