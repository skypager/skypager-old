export default function inject(existing = {}, name, options = {}) {
  if (!name) {
    return existing
  }

  return {
    ...existing,
    [name]: options,
  }
}
