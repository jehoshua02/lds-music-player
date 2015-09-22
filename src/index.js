require("babel/polyfill");
var React = require('react');
var Player = require('./components/Player');

document.addEventListener('DOMContentLoaded', function() {
  React.render(<Player />, document.getElementById('app'));
});
