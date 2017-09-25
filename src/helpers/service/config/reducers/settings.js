export default function settingsReducer(state = {}) {
  const { runtime } = this
  const { set: settings } = state
  const { set } = runtime.lodash

  return
  settings.reduce((memo, items) => {
    set(memo, items[0], items[1])
    return memo
  }, {})
}
