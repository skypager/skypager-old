import { Helper } from "skypager-runtime"

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key),
    }),
    {},
  )

export class Service {
  static configFeatures() {
    return mapContext(require.context("./config/features", false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context("./config/reducers", false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, Service, {
      registry: Helper.createContextRegistry("services", {
        context: Helper.createMockContext(),
      }),
      ...options,
    })
  }
}

export const registerHelper = () => Helper.registerHelper("service", () => Service)

export default Service

export const attach = Service.attach
