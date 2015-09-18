var React = require('react');
var songs = {
  hymns: require('../data/Hymns-EN/269/Collection').items,
  childrens: require('../data/Childrens-EN/275/Collection').items
};

console.log(songs);

var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello</h1>
      </div>
    );
  }
});

module.exports = App;
