import { join } from "path"

const modRoot = join(__dirname, "..")
const loadersPath = join(modRoot, "lib", "loaders")
const modulesPath = join(modRoot, "node_modules")

export default function loaderModules(existing = ["node_modules", modRoot, loadersPath, modulesPath], ...args) {
  // Prefer newer entries
  return [...args, ...existing]
}
