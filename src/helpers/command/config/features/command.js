export default function nameFeature(existing, updateDesc) {
  return updateDesc || existing || this.tryGet("command", this.name)
}
