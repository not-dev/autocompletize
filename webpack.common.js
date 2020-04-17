const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    autocomplete: './src/autocomplete/index.ts',
    ekiapi: './src/ekiapi/index.ts'
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  },
  output: {
    filename: 'mod/[name].min.js',
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
      template: './public/sample_minimum/index.html',
      filename: 'sample_minimum/index.html',
      chunks: ['autocomplete'],
      inject: 'head',
      minify: false
    }),
    new HtmlWebpackPlugin({
      template: './public/sample/index.ejs',
      filename: 'sample/index.html',
      inject: false,
      minify: false
    })
  ]
}
