const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'development',

  devtool: '#cheap-module-eval-source-map',

  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    inline: true,
    open: true,
    hot: true,
    proxy: { //代理接口
      '/': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false
      }
    }
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})