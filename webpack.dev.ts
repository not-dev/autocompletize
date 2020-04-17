import merge from 'webpack-merge'
import common from './webpack.common'
import webpack from 'webpack'
import path from 'path'

const module: webpack.Configuration = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    open: true
  },
  devtool: 'inline-source-map'
})

export default module
