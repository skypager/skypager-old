export default function skip(existing = [], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}
