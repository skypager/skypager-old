import { Helper, mobx } from 'skypager-runtime'
const { action, observable, computed } = mobx

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, '').replace(/\.js$/, '')]: req(key).default || req(key),
    }),
    {}
  )

export class Page extends Helper {
  static isObservable = true

  /*
    const {
      stylesheets = [],
      headScripts = [],
      dllScripts = [],
      bodyScripts = [],
      content = "",
      htmlClass = "",
      bodyClass = "",
      bodyId = "",
      headTop = "",
      headBottom = "",
      bodyTop = "",
      bodyBottom = "",
      containerId = "app",
      initialState = {},
      cdnBase = "https://cdn.skypager.io",
    } = params
  */
  static observables() {
    const { defaultTemplateParams: p } = Page
    const { defaults } = this.lodash

    return {
      templateParams: ['map', defaults(this.buildOptions(p))],
    }
  }

  static get defaultTemplateParams() {
    return {
      stylesheets: [],
      headScripts: [],
      dllScripts: [],
      bodyScripts: [],
      content: '',
      htmlClass: '',
      bodyClass: '',
      bodyId: '',
      headTop: '',
      headBottom: '',
      bodyTop: '',
      bodyBottom: '',
      initialState: {},
      publicPath: '',
      dllPublicPath: '',
      cdnBase: '',
      output: '',
    }
  }

  buildOptions(opts = {}) {
    const { isEmpty } = this.lodash
    const optionKeys = Object.keys(this.constructor.defaultTemplateParams)
    return this.chain
      .get('options')
      .merge(opts)
      .pick(optionKeys)
      .omitBy(v => isEmpty(v))
      .value()
  }

  set bodyId(val) {
    this.templateParams.set('bodyId', val)
  }
  set bodyTop(val) {
    this.templateParams.set('bodyTop', val)
  }
  set bodyBottom(val) {
    this.templateParams.set('bodyBottom', val)
  }
  set bodyClass(val) {
    this.templateParams.set('bodyClass', val)
  }
  set bodyId(val) {
    this.templateParams.set('bodyId', val)
  }
  set content(val) {
    this.templateParams.set('content', val)
  }
  set headTop(val) {
    this.templateParams.set('headTop', val)
  }
  set headBottom(val) {
    this.templateParams.set('headBottom', val)
  }
  set headScripts(val) {
    this.templateParams.set('headScripts', val)
  }
  set htmlClass(val) {
    this.templateParams.set('htmlClass', val)
  }
  set initialState(val) {
    this.templateParams.set('initialState', val)
  }
  set stylesheets(val) {
    this.templateParams.set('stylesheets', val)
  }
  set dllScripts(val) {
    this.templateParams.set('dllScripts', val)
  }
  set bodyScripts(val) {
    this.templateParams.set('bodyScripts', val)
  }
  set publicPath(val) {
    this.templateParams.set('publicPath', val)
  }
  set dllPublicPath(val) {
    this.templateParams.set('dllPublicPath', val)
  }

  @action
  refreshOutput(output = '') {
    return (this.output = output
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.length)
      .join('\n'))
  }

  @computed
  get templateArgs() {
    return this.chain
      .invoke('templateParams.keys')
      .keyBy(k => k)
      .mapValues((v, k) => this.runtime.convertToJS(this.templateParams.get(k)))
      .value()
  }

  get htmlRenderer() {
    const renderer = this.tryGet('render', require('./html'))
    return (params = {}) => renderer.call(this, params, this.context)
  }

  async render(options = {}) {
    const params = await this.prepareTemplate(options)
    const output = await this.htmlRenderer(params)
    return this.refreshOutput(output)
  }

  async renderAsync(options = {}) {
    return this.render(options)
  }

  // TODO Allow for the provider / lifecycle hooks
  async prepareTemplate(options = {}) {
    const { defaultsDeep } = this.runtime.lodash

    if (this.tryGet('prepare')) {
      const results = await this.tryGet('prepare').call(this, options, this.context)

      if (results) {
        options = defaultsDeep(results, options)
      }
    }

    return defaultsDeep({}, options, this.templateArgs)
  }

  static configFeatures() {
    return mapContext(require.context('./config/features', false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context('./config/reducers', false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, Page, {
      registry: Helper.createContextRegistry('pages', {
        context: require.context('../../pages', false, /.js$/),
      }),
      ...options,
    })
  }
}

export const registerHelper = () => Helper.registerHelper('page', () => Page)

export default Page

export const attach = Page.attach
