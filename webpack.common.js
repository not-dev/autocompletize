const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    autocomplete: './src/autocomplete_mod/index.ts',
    ekiapi: './src/ekiapi_mod/index.ts'
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  output: {
    filename: 'mod/[name]-[hash].min.js',
    path: `${__dirname}/build`,
    library: '[name]',
    libraryTarget: 'umd'
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
      template: './public/index.ejs',
      filename: 'index.html',
      inject: false,
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './public/sample.html',
      filename: 'sample.html',
      inject: 'head',
      minify: false
    })
  ]
}
