var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LDS Music Player',
      template: 'src/index.html',
      favicon: 'extension/icon.png'
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['build'] }
    })
  ]
};
