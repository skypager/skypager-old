import * as feature from "./feature"

export function attach(runtime) {
  runtime.features.register("watchman", () => feature)

  if (runtime.feature("watchman").isSupported) {
    runtime.feature("watchman").enable()
  }
}
