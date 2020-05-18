const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',   // THIS IS THE IMPORTANT PART
  externals: [
    'aws-sdk',
    nodeExternals(),
  ],
  mode: 'development'
}
