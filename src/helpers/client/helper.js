import { Helper } from 'skypager-runtime'
import axios from 'axios'

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, '').replace(/\.js$/, '')]: req(key).default || req(key),
    }),
    {}
  )

export class Client extends Helper {
  static isCacheable = true
  static allowAnonymousProviders = true
  static strictMode = false

  static configFeatures() {
    return mapContext(require.context('./config/features', false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context('./config/reducers', false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, Client, {
      registry: Helper.createContextRegistry('clients', {
        context: require.context('../../clients', false, /.js$/),
      }),
      ...options,
    })
  }

  initialize() {
    try {
      if (this.tryGet('initialize')) {
        const initializer = this.tryGet('initialize')
        initializer.call(this, this.options, this.context)
      } else {
        this.lazy('client', () => this.createProviderClient(this.options, this.context))
      }
    } catch (error) {
      this.initializationError = error
    }

    try {
      this.applyInterface(this.interface, {
        insertOptions: false,
        partial: [],
        scope: this,
        ...this.tryResult('interfaceOptions', {}),
      })
    } catch (error) {
      this.interfaceError = error
    }
  }

  get interface() {
    return this.tryResult('interface', () => {
      const methods = this.tryResult('methods', () => this.tryResult('interfaceMethods')) || []
      return this.chain
        .plant(methods)
        .keyBy(val => val)
        .mapValues(fnName => this.tryGet(fnName))
        .pickBy(fn => typeof fn === 'function')
        .value()
    })
  }

  get baseUrl() {
    return this.tryResult('baseUrl') || this.tryResult('baseURL')
  }

  get baseURL() {
    return this.baseUrl
  }

  get axios() {
    return axios
  }

  createProviderClient(options = {}) {
    const createClient = this.tryGet('createClient') || (() => this.createAxiosClient(options))
    return createClient.call(this, options)
  }

  createAxiosClient(options = {}) {
    return axios.create({
      baseURL: this.baseURL,
      ...this.options,
      ...options,
    })
  }

  headers(applyHeaders = {}) {
    const { mapValues, omit } = this.lodash

    const { client } = this

    mapValues(omit(applyHeaders, 'common', 'get', 'post', 'put'), (value, header) => {
      client.defaults.headers.common[header] = value
    })

    mapValues(applyHeaders.common || {}, (value, header) => {
      client.defaults.headers.common[header] = value
    })

    mapValues(applyHeaders.post || {}, (value, header) => {
      client.defaults.headers.post[header] = value
    })

    mapValues(applyHeaders.put || {}, (value, header) => {
      client.defaults.headers.put[header] = value
    })

    mapValues(applyHeaders.get || {}, (value, header) => {
      client.defaults.headers.get[header] = value
    })
  }
}

export const registerHelper = () => Helper.registerHelper('client', () => Client)

export default Client

export const attach = Client.attach
