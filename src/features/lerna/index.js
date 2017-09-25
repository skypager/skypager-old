import * as feature from "./feature"

export function attach(runtime) {
  runtime.features.register("lerna-adapter", () => feature)

  if (runtime.feature("lerna-adapter").isSupported) {
    runtime.feature("lerna-adapter").enable()
  }
}
