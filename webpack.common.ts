import webpack from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

const module: webpack.Configuration = {
  entry: {
    autocompletize: './src/autocompletize/index.ts',
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
      chunks: ['autocompletize'],
      inject: 'head',
      minify: false,
      hash: true
    }),
    new HtmlWebpackPlugin({
      template: './public/sample/index.ejs',
      filename: 'sample/index.html',
      inject: false,
      minify: false,
      hash: true
    })
  ]
}

export default module
