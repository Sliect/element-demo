const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config.js')

module.exports = merge.smart(baseWebpackConfig, {
  mode: 'production',

  devtool: '#source-map',

  performance: {
    hints: false
  },

  plugins: []
})