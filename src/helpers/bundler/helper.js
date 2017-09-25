const { Helper } = require("skypager-runtime")

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key),
    }),
    {},
  )

export class Bundler extends Helper {
  static configFeatures() {
    return mapContext(require.context("./config/features", false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context("./config/reducers", false, /\.js$/))
  }

  static configPresets() {
    return mapContext(require.context("./config/presets", false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, Bundler, {
      registry: Helper.createContextRegistry("bundlers", {
        context: require.context(".", false, /MOCK/),
      }),
      ...options,
    })
  }

  static registerHelper() {
    return Helper.registerHelper("bundler", () => Bundler)
  }
}

export const registerHelper = Bundler.registerHelper
export const attach = Bundler.attach

export default Bundler
