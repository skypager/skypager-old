import Helper from 'skypager-runtime/helper'
import md5File from 'md5-file'

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, '').replace(/\.js$/, '')]: req(key).default || req(key),
    }),
    {}
  )

export function hashFile(options = {}) {
  if (typeof options === 'string') {
    options = { path: options }
  }

  const { path } = options

  return new Promise((resolve, reject) => {
    md5File(path, (err, hash) => (err ? reject(err) : resolve(hash)))
  })
}

export class Deployment extends Helper {
  static isObservable = true

  static isCacheable = true

  static observables(options = {}, context = {}) {
    return {
      artifacts: ['shallowMap', {}],
      uploads: ['shallowMap', {}],
    }
  }

  static configFeatures() {
    return mapContext(require.context('./config/features', false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context('./config/reducers', false, /\.js$/))
  }

  static attach(host, options = {}) {
    const result = Helper.attach(host, Deployment, {
      registry: Helper.createContextRegistry('deployments', {
        context: Helper.createMockContext(),
      }),
      ...options,
    })

    host.feature('helpers/deployment').enable()

    return result
  }

  async hashFiles(paths = []) {
    const results = await Promise.all(
      paths.map(path =>
        hashFile(path)
          .then(hash => [path, hash])
          .catch(e => [path, false])
      )
    )

    return this.lodash.fromPairs(results)
  }

  async discover(options = {}) {}

  async discoverArtifacts(options = {}) {}

  async discoverUploads(options = {}) {}

  async hashPayload(options = {}) {}

  async preparePayload(options = {}) {}

  async archivePayload(options = {}) {}

  async uploadPayload(options = {}) {}
}

export const registerHelper = () => {
  try {
    return Helper.registerHelper('deployment', () => Deployment)
  } catch (error) {
    console.log('ERROR Registering Deployment Helper', error)
  }
}

export default Deployment

export const attach = Deployment.attach
