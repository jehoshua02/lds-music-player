require("babel/polyfill");
var React = require('react');
var App = require('./components/App');

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.getElementById('app'));
});
