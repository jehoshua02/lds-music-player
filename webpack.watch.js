var path = require('path');
var config = require('./webpack.config');

config.output.path = path.resolve(__dirname, 'watch');

module.exports = config;
