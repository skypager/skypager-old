import { Helper } from "skypager-runtime"

const mapContext = req =>
  req.keys().reduce(
    (memo, key) => ({
      ...memo,
      [key.replace(/\.\//, "").replace(/\.js$/, "")]: req(key).default || req(key),
    }),
    {},
  )

export class ProjectType extends Helper {
  static configFeatures() {
    return mapContext(require.context("./config/features", false, /\.js$/))
  }

  static configReducers() {
    return mapContext(require.context("./config/reducers", false, /\.js$/))
  }

  static attach(host, options = {}) {
    return Helper.attach(host, ProjectType, {
      registry: Helper.createContextRegistry("project-type", {
        context: Helper.createMockContext(),
      }),
      ...options,
    })
  }
}

export const registerHelper = () => Helper.registerHelper("project-type", () => ProjectType)

export default ProjectType

export const attach = ProjectType.attach
