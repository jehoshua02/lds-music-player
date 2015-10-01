require("babel/polyfill");
var React = require('react');
var {Router, Route, Redirect} = require('react-router');
var Player = require('components/Player');
var Song = require('models/Song');

React.render((
  <Router>
    <Route path="/:id" component={Player} />
    <Redirect from="/" to={'/' + Song.random().id.toLowerCase()} />
  </Router>
), document.getElementById('app'));
