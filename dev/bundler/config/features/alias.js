import { resolve } from "path"

export default function alias(existing = {}, from, to) {
  if (!arguments.length) {
    return
  }

  return {
    ...existing,
    [from]: to || resolve(process.cwd(), "node_modules", from),
  }
}
