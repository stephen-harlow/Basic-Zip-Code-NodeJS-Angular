var Webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer-core');
var csswring = require('csswring');
var path = require('path');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var assetsPath = path.resolve(__dirname, 'public', 'assets');
var entryPath = path.resolve(__dirname, 'frontend', 'app.es6.js');
var host = process.env.APP_HOST || 'localhost';

var config = {

  // Makes sure errors in console map to the correct file
  // and line number
  devtool: 'eval',
  entry: [

    // For hot style updates
    'webpack/hot/dev-server',

    // The script refreshing the browser on none hot updates
    'webpack-dev-server/client?http://' + host + ':3001',

    // Our application
    entryPath
  ],
  output: {
    path: assetsPath,
    filename: 'bundle.js'
  },
  node: {
    fs: "empty"
  },
  module: {

    loaders: [
      { test: /\.es6.js$/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }

    ]
  },
  postcss: [autoprefixer],

  plugins: [
    // We have to manually add the Hot Replacement plugin when running
    // from Node
    new Webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
