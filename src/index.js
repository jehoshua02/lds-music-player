require("babel/polyfill");
var React = require('react');
var {Router, Route} = require('react-router');
var Player = require('components/Player');

React.render((
  <Router>
    <Route path="/" component={Player} />
  </Router>
), document.getElementById('app'));
