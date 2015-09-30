var path = require('path');
var glob = require('glob').sync;
var config = require('./webpack.build');

var entries = {};
glob('./src/**/*.test.js').forEach(function (file) {
  var name = file.match(/^\.\/src\/(.*?)\.test\.js/)[1];
  entries[name] = path.resolve(__dirname, file);
});

config.devtool = null;
config.entry = entries;
config.output = {
  path: path.resolve(__dirname, './tmp/test'),
  filename: '[name].test.js'
};

module.exports = config;
