export default function commandReducer(state = {}) {
  const { command, description } = state
  return command || description
}
