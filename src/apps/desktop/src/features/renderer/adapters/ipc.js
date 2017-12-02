export function featureWasEnabled() {
  const { runtime } = this
  const { isUndefined, isFunction } = this.lodash

  runtime.listenToIPC('INVOKE', ({ payload }) => {
    const { method, args = [] } = payload

    console.log('got invok', method, args)

    const val = runtime.get(method)

    if (isFunction(val)) {
      runtime.invoke(method, args)
    } else if (!isUndefined(val)) {
      runtime.get(method)
    } else {
    }
  })
}
