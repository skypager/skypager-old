export default function option(existing = [], ...args) {
  if (arguments.length === 0) return

  if (args.length === 0) {
    return existing
  }

  return [...existing, args]
}
