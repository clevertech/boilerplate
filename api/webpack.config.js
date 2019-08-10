const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  externals: [nodeExternals(), "pg-native"],
  watch: true,
  node: {
    __dirname: true,
  }
}
