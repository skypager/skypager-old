export default function registry(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}
