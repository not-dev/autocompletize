const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    budle: './src/index.js'
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  output: {
    filename: 'js/[name]-[hash].min.js',
    path: `${__dirname}/build`
    /*
    library: '[name]',
    libraryTarget: 'umd'
    */
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      inject: 'head',
      minify: false
    })
  ],
}
