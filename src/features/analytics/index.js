import categories from "./categories"
import platforms from "./platforms"

/**
  When the feature is enabled on the skypager runtime,
  it will be accessible via the analytics property on the runtime.
*/
export const createGetter = "analytics"

/**

This feature adds two functions to the runtime: track and identify.

*/
export const hostMethods = ["track", "identify"]

/**

By default, feature interfaces have their arguments normalized
so that there are both options = {} and context = {} arguments
passed down.  We disable this behavior here since we want to just
forward the arguments passed to the track and identify methods

@see https://docs.skypager.io/helpers/feature

*/
export const hostMixinOptions = {
  partial: [],
  injectOptions: false
}

export function featureWasEnabled(options = {}) {
  // TODO: Inject the analytics.js dependency, add globals
}

// Mock for now
export function lazyClient() {
  return {
    track(...args) {},
    identify(...args) {}
  }
}

export function identify(...args) {
  this.emit("identify", ...args)
  return this.invoke("analytics.client.identify", ...args)
}

export function track(...args) {
  this.emit("track", ...args)
  return this.invoke("analytics.client.track", ...args)
}
