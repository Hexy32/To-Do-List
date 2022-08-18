module.exports = {
  entry: {
    app: './build/app/app.js',
    server: './build/server/server.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + './bundle/',
  },
  resolve: {
    modules: [...],
    fallback: {
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "crypto": false,
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    }
  },
  mode: 'development',
}
