export const featureMethods = [
  'runScriptAtPath',
  'runPackageScript',
  'runCode',
  'findScriptById',
  'findMatchingScripts',
  'runScriptById',
  'lazyCurrentModule',
]

export const hostMethods = ['getCurrentModule']

export const createGetter = 'scriptRunner'

export function getCurrentModule() {
  return this.scriptRunner.currentModule
}

export function lazyCurrentModule() {
  const { runtime } = this
  const { existsSync: exists } = runtime.fsx
  const {
    currentPackagePath = runtime.pathUtils.resolve(runtime.cwd, 'package.json'),
  } = runtime.currentState

  if (exists(currentPackagePath)) {
    try {
      __non_webpack_require__(currentPackagePath)
      const cache = __non_webpack_require__.cache || {}
      const currentModule = cache[currentPackagePath]

      return currentModule
    } catch (error) {
      return error
    }
  } else {
    return false
  }
}

export async function runScriptById(options = {}) {
  const script = await this.findScriptById(options)

  if (!script) {
    throw new Error('Can not find a script with this id')
  }

  const scriptPath = this.runtime.resolve(script)

  return this.runScriptAtPath({ scriptPath, script: script })
}

export async function findMatchingScripts(options = {}) {
  if (this.lodash.isString(options)) {
    options = { script: options }
  }

  const { scriptsExtension = '.js', scriptsPrefix = 'scripts' } = options
  let { script } = options

  if (!script) {
    throw new Error('Must pass a valid script id')
  }

  const normalize = val =>
    unescape(val)
      .split(/\\|\//g)
      .join('::')

  const scriptTag = normalize(script)

  const scriptMatcher = val => {
    const res = normalize(val).indexOf(scriptTag) >= 0
    //console.log('testing ' + normalize(val) + ' against ' + scriptTag, res)
    return res
  }

  const possibleMatches = this.runtime.fileManager.fileIds
    .filter(fileId => fileId.match(scriptsPrefix) && fileId.endsWith(scriptsExtension))
    .filter(scriptMatcher)

  return possibleMatches
}

export async function findScriptById(options = {}) {
  if (this.lodash.isString(options)) {
    options = { script: options }
  }

  const { scriptsExtension = '.js', scriptsPrefix = 'scripts', script } = options

  if (!script) {
    throw new Error('Must pass a valid script id')
  }

  const possibleMatches = this.runtime.fileManager.fileIds
    .filter(fileId => fileId.match(scriptsPrefix) && fileId.endsWith(scriptsExtension))
    .filter(fileId =>
      fileId.replace(/\/|\\/g, '.').match(new RegExp(script.replace(/\/|\\/g, '.')))
    )

  if (possibleMatches.length > 1) {
    return possibleMatches.sort(m => m.length)[0]
  } else if (possibleMatches.length === 0) {
    return
  } else if (possibleMatches.length === 1) {
    const match = possibleMatches[0]
    return match
  }
}

export async function runCode(options = {}) {
  if (this.lodash.isString(options)) {
    options = { code: options }
  }

  const { scriptPath = 'code.js', code = '' } = options

  return await doRun.call(this, createRunner.call(this, { code, scriptPath }))
}

export async function runScriptAtPath(options = {}) {
  if (this.lodash.isString(options)) {
    options = { script: options }
  }

  const { runtime } = this
  const { script } = options

  const scriptPath = runtime.resolve(script)
  const code = await runtime.fsx.readFileAsync(scriptPath).then(b => b.toString())

  return await doRun.call(this, createRunner.call(this, { code, scriptPath }))
}

export async function runPackageScript(options = {}) {
  const { runtime } = this

  if (this.lodash.isString(options)) {
    options = { script: options }
  }

  const { args = [], yarn = false, script = 'start' } = options

  const extraArgs = args.length ? `-- ${args.join(' ')}` : ''

  const scripts = runtime.get('currentPackage.scripts', {})

  if (scripts[script]) {
    const results = await runtime.select('process/result', {
      command: yarn ? `yarn ${script}` : `npm run ${script}${extraArgs}`,
    })

    return options.results ? results : results.exitCode !== null && parseInt(results.exitCode) === 0
  } else {
    if (!scripts.length) {
      throw new Error(`Package does not have the script ${script}.}`)
    } else {
      throw new Error(
        `Package does not have the script ${script}. Valid scripts are: ${Object.keys(scripts).join(
          ', '
        )}`
      )
    }
  }
}

function createRunner(options = {}) {
  const { runtime = this.runtime, scriptPath, code } = options

  return runtime.createCodeRunner(code, runtime.argv, {
    ...runtime.sandbox,
    skypager: runtime,
    ARGV: skypager.argv,
    __filename: scriptPath,
    __dirname: skypager.pathUtils.dirname(scriptPath),

    colors: skypager.cli.colors,

    require: this.get('currentModule.require', process.mainModule.require),

    process,

    print: (...args) => skypager.cli.print(...args),
    clear: (...args) => skypager.cli.clear(...args),
    randomBanner: (...args) => skypager.cli.randomBanner(...args),
    banner: (...args) => skypager.cli.randomBanner(...args),
    icon: (...args) => skypager.cli.icon(...args),
    log: (...args) => console.log(...args),
    bundler: (...args) => skypager.bundler(...args),
    client: (...args) => skypager.client(...args),
    command: (...args) => skypager.command(...args),
    document: (...args) => skypager.document(...args),
    documentType: (...args) => skypager.documentType(...args),
    feature: (...args) => skypager.feature(...args),
    page: (...args) => skypager.page(...args),
    project: (...args) => skypager.project(...args),
    projectType: (...args) => skypager.projectType(...args),
    select: (...args) => skypager.select(...args),
    selectChain: (...args) => skypager.selectChain(...args),
    repl: (...args) => skypager.repl(...args),
    server: (...args) => skypager.server(...args),
    service: (...args) => skypager.service(...args),
    webpack: (...args) => skypager.webpack(...args),
    get chain() {
      return skypager.chain
    },
    get directories() {
      return skypager.fileManager.directories
    },
    get files() {
      return skypager.fileManager.files
    },
    get state() {
      return skypager.currentState
    },
    get framework() {
      return skypager.framework
    },
    get fs() {
      return skypager.fsx
    },
    get fsm() {
      return skypager.fsm
    },
    ...runtime.slice(
      'bundlers',
      'clients',
      'commands',
      'documents',
      'documentType',
      'features',
      'pages',
      'projects',
      'projectTypes',
      'servers',
      'services',
      'webpacks',
      'selectors'
    ),
    ...runtime.slice(
      'pathUtils',
      'lodash',
      'stringUtils',
      'urlUtils',
      'proc',
      'mobx',
      'packageFinder',
      'fileManager',
      'Helper',
      'Runtime',
      'selectors'
    ),
    console,
  })
}

async function doRun(codeRunner) {
  const { runtime } = this
  const results = await codeRunner.call(runtime, runtime.argv)

  if (results.error) {
    results.error = {
      message: results.error.message,
      stack: results.error.stack
        .split('\n')
        .filter(line => line && !line.match(/regenerator|core-js|babel-runtime/i)),
    }
  }

  return results
}
