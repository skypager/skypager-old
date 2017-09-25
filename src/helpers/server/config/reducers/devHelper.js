export default function devHelper(state = {}) {
  return {
    hot: state.hot || false,
    dev: state.dev || false,
  }
}
