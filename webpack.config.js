const path = require('path')

module.exports = {
  entry: {
    app: './build/app/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve('./bundle'),
  },
  mode: 'production',
  stats: {
    colors: true,
    errorDetails: true,
  },
}
