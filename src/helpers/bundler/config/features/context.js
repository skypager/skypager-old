import { resolve } from "path"

export default function context(existing, folder = process.cwd()) {
  return resolve(folder)
}
