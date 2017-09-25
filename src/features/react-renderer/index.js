import * as _feature from "./feature"

export function use(next) {
  const skypager = this
  skypager.features.register("react/renderer", () => _feature)
  next && next.call && next()
}

export default use

export const feature = _feature
