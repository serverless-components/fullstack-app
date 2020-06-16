const path = require('path')
console.log(process.env.NODE_ENV)
module.exports = {
  target: 'node',
  entry: './app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  externals: {
    'aws-sdk': 'aws-sdk',
  }
}