export default function dev(existing, arg) {
  if (arguments.length === 0) return

  const serverInstance = this
  const { runtime } = serverInstance

  return arg !== false
}
