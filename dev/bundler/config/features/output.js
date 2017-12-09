import { resolve } from "path"
import isPlainObject from "lodash/isPlainObject"
import isString from "lodash/isString"

export default function outputFeature(existing, output) {
  if (isPlainObject(output)) {
    return {
      ...existing,
      ...output,
    }
  }

  if (isString(output)) {
    return {
      ...existing,
      path: resolve(process.cwd(), output),
    }
  }

  return existing
}
