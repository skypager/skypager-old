import isObject from "lodash/isObject"
import isString from "lodash/isString"

import { basename, parse } from "path"

const fromObject = entries =>
  Object.keys(entries).reduce((acc, key) => {
    const entry = entries[key]

    return {
      ...acc,
      [key]: Array.isArray(entry) ? entry : [entry],
    }
  }, {})

const fromString = entry => {
  const parsed = parse(entry)
  const b = basename(parsed.base, parsed.ext).toLowerCase()

  return {
    [b]: [entry],
  }
}

export default function entry(existing, arg) {
  if (isObject(arg)) {
    return {
      ...existing,
      ...fromObject(arg),
    }
  }

  if (isString(arg)) {
    return {
      ...existing,
      ...fromString(arg),
    }
  }

  return existing
}
