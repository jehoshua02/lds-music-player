var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    path.resolve(__dirname, './src/index.js'),
    path.resolve(__dirname, './src/styles.scss')
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, loader: 'babel', exclude: /node_modules/},
      {test: /\.json$/, loader: 'json'},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass')}
    ]
  },
  resolve: {
    root: path.resolve(__dirname, 'src/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'LDS Music Player',
      template: './src/index.html',
      favicon: './src/icon.png'
    }),
    new WebpackNotifierPlugin({
      alwaysNotify: true
    }),
    new ExtractTextPlugin('styles.css', { allChunks: true })
  ]
};
