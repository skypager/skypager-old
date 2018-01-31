/**
  The Firebase Feature provides us with a cross platform wrapper around
  the firebase SDK, whether we use it from the web client or from the server client.

  It provides conveniences for working with the real time database, user authentication,
  and cloud storage APIs.

  @example ref returns a firebase database ref

    runtime.fb.ref("/v1/development/books")

  @example snapshot returns a firebase database ref's server value in JSON

    runtime.fb.snapshot("/v1/development/books")
      .then((books = {}) => { console.log(books) })
*/

// The firebase feature can be accessed by the fb property on the runtime.
export const createGetter = 'fb'

export const featureMethods = [
  'ref',
  'snapshot',
  'uploadFile',
  'intersect',
  // lazy load firebase library loading unless requested
  'lazyAuth',
  'lazyDatabase',
  'lazyStorage',
  'createPath',
  'getServerTimestamp',
  'onAuthStateChanged',
  'getLibrary',
  'lazyClientLibrary',
]

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export function featureWasEnabled(options = {}) {
  const { firebase: firebaseApp } = options
  this.hide('firebaseApp', firebaseApp)
}

export function getLibrary() {
  return this.firebaseApp ? this.firebaseApp : this.runtime.get('firebase', global.firebase)
}

export function onAuthStateChanged(fn) {
  return this.auth.onAuthStateChanged(fn)
}

export function getServerTimestamp() {
  return this.library.database.ServerValue.TIMESTAMP
}

export function snapshot(path, options = {}, fn) {
  const ref = this.ref(path, options, fn)

  return ref.once('value').then(v => (v.exists() ? v.val() : undefined))
}

export async function intersect(...refs) {
  const { merge, intersection, pick } = this.lodash

  const values = await Promise.all(
    refs.map(ref => ref.once('value').then(v => (v.exists() ? v.val() : {})))
  )

  const keys = values.map(obj => Object.keys(obj))
  const matches = intersection(...keys)

  return merge(...values.map(obj => pick(obj, matches)))
}

export function ref(path, options = {}, fn) {
  const { isFunction } = this.lodash

  if (isFunction(options)) {
    fn = options
    options = {}
  }

  const refPath = isFunction(path) ? path.call(this, options) : path

  let ref = this.database.ref(options.raw ? refPath : this.createPath(refPath, options))

  if (isFunction(fn)) {
    ref = fn.call(this, ref)
  }

  return ref
}

export function createPath(path, options = {}) {
  const { runtime } = this

  const {
    version = runtime.get('argv.dbVersion', process.env.FUNCTIONS_DB_VERSION || 'v3'),
    dbEnv = runtime.get(
      'argv.dbEnv',
      process.env.FUNCTIONS_DB_ENV ||
        (runtime.argv.productionDeployment ? 'production' : 'development')
    ),
  } = options

  return `${version}/${dbEnv}/${path}`.replace(/\/\//g, '/')
}

export function lazyDatabase(options = {}) {
  return this.library.database()
}

export function lazyAuth(options = {}) {
  return this.library.auth()
}

export function lazyStorage(options = {}) {
  return this.library.storage()
}

export async function uploadFile(files, metadata = {}) {
  const filesArray = Object.values(files)
  const { storage } = this

  const results = []
  for (let i = 0; i < filesArray.length; i++) {
    const file = filesArray[i]
    const ref = storage.ref().child(`/uploads/${file.name}`)
    const result = await ref.put(file, metadata)
    results.push(result)
  }
  return results
}

export function lazyClientLibrary() {
  if (typeof window !== 'undefined' && window.firebase) {
    return window.firebase
  }

  var config = {}

  const firebase = require('firebase')

  firebase.initializeApp(config)

  return firebase
}
