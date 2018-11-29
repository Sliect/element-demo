const path = require('path')
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader');

const resolve = function(dirname) {
  return path.join(__dirname, dirname)
}

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: {
    app: isDev ? resolve('./play.js') : resolve('../src/index.js')
  },

  output: {
    path: resolve('../dist'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, '../src')
    }
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }, {
      test: /\.scss$/,
      use: isDev ? [{
          loader: 'style-loader'
        },
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader'
        }
      ] : [
        MiniCssExtractPlugin.loader,
        "css-loader",
        'sass-loader'
      ]
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader'
        },
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    }, {
      test: /\.(png|jpg|gif)$/,
      loader: 'file-loader',
      query: {
        name: '[name].[ext]?[hash]',
        useRelativePath: process.env.NODE_ENV === "development"
      }
    }, {
      test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]')
      }
    }]
  },

  plugins: [
    new VueLoaderPlugin(),
    new HTMLWebpackPlugin({
      template: resolve('../src/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
    }),
  ],

  optimization: {
    runtimeChunk: {
      name: "manifest"
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "commons",
          chunks: "all"
        }
      }
    }
  }
}