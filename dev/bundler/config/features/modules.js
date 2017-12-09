export default function modules(existing = ["node_modules"], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}
