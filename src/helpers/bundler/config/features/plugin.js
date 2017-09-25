export default function pluginFeature(existing, name, ...args) {
  if (!arguments.length) {
    return
  }

  if (typeof name === "function") {
    args = name
    name = name.name
  }

  return {
    ...existing,
    [name]: args,
  }
}
