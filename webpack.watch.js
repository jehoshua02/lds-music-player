var path = require('path');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var config = require('./webpack.build');

config.output.path = path.resolve(__dirname, './watch');
config.plugins.push(
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    server: {baseDir: ['./watch']}
  })
);

module.exports = config;
