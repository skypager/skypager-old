export default function set(existing = [], ...args) {
  if (arguments.length === 0) {
    return
  }

  return [...existing, args]
}
