export const shortcut = 'ipc'

export const featureMethods = ['invoke']

export const featureMixinOptions = {
  partial: [],
  insertOptions: false,
}

export function invoke(method, ...args) {
  return this.runtime.ipcUtils.ask('INVOKE', { method, args })
}

export function featureWasEnabled() {
  const { runtime } = this
  const { isUndefined, isFunction } = this.lodash

  runtime.listenToIPC('INVOKE', ({ payload }) => {
    const { method, args = [] } = payload

    const val = runtime.get(method)

    if (isFunction(val)) {
      runtime.invoke(method, args)
    } else if (!isUndefined(val)) {
      runtime.get(method)
    } else {
    }
  })
}
