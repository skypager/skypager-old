export const hostMethods = ["lazyLoadersRegistry", "lazyPluginsRegistry"]

export function featureWasEnabled() {
  const { runtime } = this

  runtime.whenReady(() => {
    if (runtime.commands) {
    }
  })
}

export function lazyLoadersRegistry(options = {}, context = {}) {
  const { runtime = this } = context
  const { createMockContext, createContextRegistry } = runtime.Helper

  return createContextRegistry("loaders", { context: createMockContext() })
}

export function lazyPluginsRegistry(options = {}, context = {}) {
  const { runtime = this } = context
  const { createMockContext, createContextRegistry } = runtime.Helper

  return createContextRegistry("plugins", { context: createMockContext() })
}
