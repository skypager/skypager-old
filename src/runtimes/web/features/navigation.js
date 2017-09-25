export const hostMethods = ["navigate"]

export function featureWasEnabled() {
  const { runtime } = this

  if (!runtime.has("history")) {
    runtime.feature("history").enable()
  }
}

export function navigate(url, pushOrReplace = "push") {
  if (this.state.get("historyIsActive")) {
    this.history[pushOrReplace === "push" ? "push" : "replace"](url)
  }

  return this
}
