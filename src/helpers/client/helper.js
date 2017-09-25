import { Helper } from "skypager-runtime"

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key),
    }),
    {},
  )

export class Client extends Helper {
  static configFeatures() {
    return mapContext(require.context("./config/features", false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context("./config/reducers", false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, Client, {
      registry: Helper.createContextRegistry("clients", {
        context: require.context("../../clients", false, /.js$/),
      }),
      ...options,
    })
  }
}

export const registerHelper = () => Helper.registerHelper("client", () => Client)

export default Client

export const attach = Client.attach
