var React = require('react');
var songs = require('../modules/songs');

var App = React.createClass({
  getInitialState: function () {
    return {
      search: ''
    };
  },
  render: function () {
    return (
      <div>
        <input type="text" placeholder="Search" onChange={this._handleSearchChange} autoFocus />
        <ul>
          {songs.search(this.state.search).map(function (result, key) {
            return (
              <li key={key}>{JSON.stringify({
                id: result.item.id,
                number: result.item.number,
                name: result.item.name,
                score: result.score
              })}</li>
            );
          })}
        </ul>
      </div>
    );
  },
  _handleSearchChange: function (e) {
    this.setState({search: e.target.value});
  }
});

module.exports = App;
