export default function outputReducer(state) {
  const { output, target } = state

  if (output) {
    return {
      chunkFilename: "[name].[hash:4]-[chunkhash:4].js",
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
      filename: "[name].js",
      libraryTarget: target === "web" ? "var" : "commonjs2",
      publicPath: "/",
      ...output,
    }
  }
}
