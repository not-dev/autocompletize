import webpack from 'webpack'
import merge from 'webpack-merge'
import common from './webpack.common'

import CopyPlugin from 'copy-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

const module: webpack.Configuration = merge(common, {
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
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
        ignore: ['**/*.ejs']
      },
      {
        from: 'README.md'
      },
      {
        from: 'README_JP.md'
      }
    ])
  ]
})

export default module
