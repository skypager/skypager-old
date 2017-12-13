const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  standardConfig: function() {
    return {
      entry: {
        index: skypager.join('src/index.js'),
      },
      target: 'node',
      devtool: 'cheap-module-eval',
      context: this.runtime.cwd,
      output: {
        path: this.runtime.join('lib'),
        libraryTarget: 'umd',
        filename: '[name].js',
      },
      node: {
        __dirname: false,
        __filename: false,
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: this.runtime.join('files'),
            to: this.runtime.join('lib', 'files'),
            flatten: false,
          },
        ]),
      ],
    }
  },
}
