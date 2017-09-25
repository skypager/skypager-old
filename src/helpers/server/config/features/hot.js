export default function hot(existing = {}, arg) {
  if (arguments.length === 0) return

  const serverInstance = this
  const { runtime } = serverInstance

  if (typeof arg === "boolean") {
    return { ...existing, enabled: arg !== false }
  } else if (typeof arg === "object") {
    return { ...existing, ...arg }
  } else if (typeof arg === "undefined") {
    return { ...existing, enabled: true }
  }
}
