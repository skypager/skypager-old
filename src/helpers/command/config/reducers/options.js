export default function optionsReducer(state = {}) {
  const { option = [], options = [] } = state

  return [...option, ...options]
}
