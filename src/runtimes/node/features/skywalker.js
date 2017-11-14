import createSkywalker from 'skywalker'
import micromatch from 'micromatch'
import pathMatcher from 'runtime/utils/path-matcher'

export const createGetter = 'skywalker'

const statsKeys = [
  'dev',
  'mode',
  'nlink',
  'uid',
  'gid',
  'rdev',
  'blksize',
  'ino',
  'size',
  'blocks',
  'atimeMs',
  'mtimeMs',
  'ctimeMs',
  'birthtimeMs',
  'atime',
  'mtime',
  'ctime',
  'birthtime',
]

export const featureMethods = [
  'walk',
  'watcher',
  'walker',
  'create',
  'readIgnoreFiles',
  'projectWalker',
  'lazyIgnorePatterns',
  'matchPaths',
  'selectMatches',
]

export const observables = () => ({
  files: ['shallowMap', []],
  directories: ['shallowMap', []],

  directoryObjects: [
    'computed',
    function() {
      return this.directories.values()
    },
  ],

  directoryIds: [
    'computed',
    function() {
      return this.directories.keys()
    },
  ],

  fileObjects: [
    'computed',
    function() {
      return this.files.values()
    },
  ],

  fileIds: [
    'computed',
    function() {
      return this.files.keys()
    },
  ],

  addDirectory: [
    'action',
    function(fileInfo, baseFolder) {
      const { directories, runtime } = this
      const { pick } = runtime.lodash
      const { parse, relative } = runtime.pathUtils
      const toFileId = ({ path }) => relative(runtime.resolve(baseFolder || runtime.cwd), path)

      directories.set(toFileId(fileInfo), {
        ...parse(fileInfo.path),
        ...pick(fileInfo, 'path', 'extension', 'mime'),
        relative: toFileId(fileInfo),
        stats: pick(fileInfo, statsKeys),
      })

      return this
    },
  ],

  addFile: [
    'action',
    function(fileInfo, baseFolder) {
      const { files, runtime } = this
      const { pick } = runtime.lodash
      const { parse, relative } = runtime.pathUtils
      const toFileId = ({ path }) => relative(runtime.resolve(baseFolder || runtime.cwd), path)

      files.set(toFileId(fileInfo), {
        ...parse(fileInfo.path),
        ...pick(fileInfo, 'path', 'extension', 'mime'),
        relative: toFileId(fileInfo),
        stats: pick(fileInfo, statsKeys),
      })

      return this
    },
  ],
})

export function create(options = {}) {
  if (typeof options === 'string') {
    options = { baseFolder: options }
  }

  return this.projectWalker({ bare: true, ...options })
}

export function projectWalker(options = {}) {
  const { runtime } = this
  const { addDirectory, addFile } = this

  if (typeof options === 'string') {
    options = { baseFolder: options }
  }

  const { baseFolder = runtime.cwd } = options
  const {
    ignorePatterns = this.readIgnoreFiles(options).map(p => micromatch.makeRe(p)),
    exclude = [],
  } = options

  let skywalker = createSkywalker(baseFolder)

  if (options.bare) {
    return skywalker
  }

  skywalker = skywalker
    .ignoreDotFiles(true)
    .directoryFilter(/node_modules|log|dist|build|tmp/, (next, done) => {
      done(null, false)
      return false
    })
    .fileFilter(/.log$/, (next, done) => {
      done(null, false)
      return false
    })

  ignorePatterns.filter(v => typeof v === 'string' && v.length).forEach(pattern => {
    skywalker = skywalker
      .directoryFilter(pattern, (n, d) => d(null, false))
      .fileFilter(pattern, (n, d) => d(null, false))
  })

  const visit = node => {
    const { _: info } = node

    if (info.isDirectory) {
      addDirectory(info)
      return info.children.map(child => visit(child))
    } else {
      addFile(info)
      return node
    }
  }

  skywalker.run = (err, tree) => {
    return new Promise((resolve, reject) =>
      skywalker.start((err, tree) => {
        err ? reject(err) : resolve(tree)
      })
    ).then(tree => {
      visit(tree)
      return { tree, files: this.files.keys(), directories: this.directories.keys() }
    })
  }

  return skywalker
}

export async function walk(...args) {
  const i = walker.call(this, ...args)
  await i.run()
  return this
}

export function watcher(options = {}) {
  try {
    __non_webpack_require__.resolve('gaze')
  } catch (error) {
    throw new Error(`Missing the gaze module, so file watching is unavailable.`)
  }

  const skywalker = this.projectWalker(options)
    .on('change', function(...args) {
      console.log('change', args)
    })
    .on('remove', function() {
      console.log('remove', args)
    })
    .on('created', function() {
      console.log('created', args)
    })
    .on('rename', function() {
      console.log('rename', args)
    })

  return cb => {
    console.log('immediate callback')

    skywalker.run().then(() => {
      console.log('ran, running watcher')
      skywalker.watch('gaze', (...args) => {
        console.log('walker callback', args)
      })
      return this
    })
  }
}

export function lazyIgnorePatterns() {
  return this.readIgnoreFiles().map(pattern => micromatch.makeRe(pattern))
}

export function readIgnoreFiles(options = {}) {
  if (typeof options === 'string') {
    options = { baseFolder: options }
  }

  const { runtime } = this
  const { compact, uniq } = runtime.lodash
  const {
    gitignore = true,
    skypagerignore = true,
    npmignore = false,
    dockerignore = false,
    baseFolder = runtime.cwd,
  } = { ...this.options, options }

  const files = compact([
    gitignore && runtime.fsx.findUpSync('.gitignore', { cwd: baseFolder }),
    npmignore && runtime.fsx.findUpSync('.npmignore', { cwd: baseFolder }),
    skypagerignore && runtime.fsx.findUpSync('.skypagerignore', { cwd: baseFolder }),
    dockerignore && runtime.fsx.findUpSync('.dockerignore', { cwd: baseFolder }),
  ])

  const contents = files.map(file => runtime.fsx.readFileSync(file).toString())

  const combinedPatterns = uniq([
    ...contents
      .reduce((memo, chunk) => (memo = memo.concat(chunk)), '')
      .split('\n')
      .map(t => t.trim())
      .filter(f => f && f.length > 1 && !f.startsWith('#')),
  ])

  return combinedPatterns.map(pattern => (pattern.endsWith('/') ? `${pattern}**` : pattern))
}

export const walker = projectWalker

export function matchPaths(options = {}) {
  const { castArray } = this.lodash
  let { rules = options.rules || options || [] } = options

  rules = castArray(rules).map(rule => (typeof rule === 'string' ? micromatch.makeRe(rule) : rule))

  return options.fullPath
    ? this.fileObjects.filter(file => pathMatcher(rules, file.path)).map(result => result.relative)
    : this.fileIds.filter(fileId => pathMatcher(rules, fileId))
}

export function selectMatches(options = {}) {
  const { convertToJS } = this.runtime
  const paths = this.matchPaths(options)
  return paths.map(key => convertToJS(this.files.get(key)))
}
