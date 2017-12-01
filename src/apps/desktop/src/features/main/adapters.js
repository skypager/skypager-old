export function featureWasEnabled() {
  const { runtime } = this

  runtime.listenToIPC('FILE_MANAGER_ADAPTER', ({ payload = {}, topic }) => {
    const { method, args = [] } = payload

    return Promise.resolve(
      typeof runtime.fileManager[method] === 'function'
        ? runtime.fileManager.invoke(method, ...args)
        : runtime.fileManager.get(method)
    ).catch(error => error)
  })

  runtime.listenToIPC('PACKAGE_FINDER_ADAPTER', ({ payload = {}, topic }) => {
    const { method, args = [] } = payload

    return Promise.resolve(
      typeof runtime.packageFinder[method] === 'function'
        ? runtime.packageFinder.invoke(method, ...args)
        : runtime.packageFinder.get(method)
    ).catch(error => error)
  })

  runtime.listenToIPC('PACKAGE_MANAGER_ADAPTER', ({ payload = {}, topic }) => {
    const { method, args = [] } = payload

    return Promise.resolve(
      typeof runtime.packageManager[method] === 'function'
        ? runtime.packageManager.invoke(method, ...args)
        : runtime.packageManager.get(method)
    ).catch(error => error)
  })

  runtime.listenToIPC('SELECTORS_ADAPTER', ({ payload = {}, topic }) => {
    const { selector, args = [] } = payload
    return Promise.resolve(runtime.invoke('select', selector, ...args))
  })
}
