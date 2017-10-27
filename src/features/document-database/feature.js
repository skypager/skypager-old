import router from 'runtime/utils/router'
import * as config from './config'
import pathMatcher from 'runtime/utils/path-matcher'

export const createGetter = 'docsDB'

export const featureMethods = [
  'doc',
  'start',
  'selectMatches',
  'matchPaths',
  'getAvailable',
  'getRouter',
  'applyRoute',
]

export const configFeatures = config.configFeatures
export const configReducers = config.configReducers

export function getRouter() {
  return this.docsRouter
}

export function applyRoute(pattern, o = {}, c = {}) {
  o = {
    pattern,
    ...(c || {}),
    ...(o || {}),
  }

  let results = this.docsRouter.get(o.pattern).map(({ result, path } = {}) => ({
    path,
    ...result,
  }))

  if (o.include) {
    results = results.filter(result => pathMatcher(o.include, result.path))
  }

  if (o.exclude) {
    results = results.filter(result => !pathMatcher(o.exclude, result.path))
  }

  return results
}

export function matchPaths(options = {}) {
  const { rules = options.rules || options } = options
  return this.fileIds.filter(fileId => pathMatcher(rules, fileId))
}

export function selectMatches(options = {}) {
  const { convertToJS } = this.runtime
  const paths = this.matchPaths(options)
  return paths.map(key => convertToJS(this.files.get(key)))
}

export function getAvailable() {
  return this.documents.keys()
}

export function doc(documentId) {
  if (this.documents.has(documentId)) {
    return this.documents.get(documentId)
  }
}

export function featureWasEnabled(config = {}) {
  const { runtime } = this

  runtime.selectors.add(require.context('./selectors', true, /\.js$/))

  router(this, { hidden: true, routerProperty: 'docsRouter' })
}

export function observables(options = {}, context = {}) {
  return {
    routes: ['map', {}],
    documents: ['map', {}],
    status: CREATED,
  }
}
