const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: true,
        terserOptions: {
          compress: { drop_console: true }
        }
      })
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'public',
        ignore: []
      }
    ])
  ]
})
