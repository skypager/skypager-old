export default function node(state) {
  const { node, target } = state

  if (target === "node") {
    return {
      __filename: false,
      __dirname: false,
      ...node,
    }
  }
}
