var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var config = require('./webpack.build');

config.output.path = path.resolve(__dirname, './tmp/watch');
config.plugins.push(
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: {baseDir: ['./tmp/watch']}
  })
);

module.exports = config;
