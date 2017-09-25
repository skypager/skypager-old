export default function description(existing, updateDesc) {
  return updateDesc || existing || this.get("options.name", this.name)
}
