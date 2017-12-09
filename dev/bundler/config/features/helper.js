export default function helper(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}
