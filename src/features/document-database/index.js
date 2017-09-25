import * as Feature from "./feature"

export function initializer(next) {
  const skypager = this
  skypager.features.register("document-database", () => Feature)
  skypager.feature("document-database").enable()

  next && next.call && next()
}

export const feature = Feature
