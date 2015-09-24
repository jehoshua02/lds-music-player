var React = require('react');
var Radium = require('radium');
var T = React.PropTypes;
var SearchSelect = require('components/SearchSelect');
var Songs = require('modules/Songs');
var s = require('modules/classesToStyles')(require('./styles'));

var Picker = React.createClass({
  propTypes: {
    onPick: T.func.isRequired
  },
  render: function () {
    return (
      <span>
        <SearchSelect
          search={this._searchSongs}
          renderResult={this._renderSearchResult}
          onSelect={this._handleSearchSelect}
        />
        <button onClick={this._handleRandomSong}>Random</button>
      </span>
    );
  },
  componentDidMount: function () {
    this.props.onPick(Songs.random());
  },
  _searchSongs: function (value) {
    return Songs.search(value).filter(function (result) {
      return result.score < 0.5;
    });
  },
  _renderSearchResult: function (result) {
    var song = result.item;
    return (
      <pre>{JSON.stringify({
        id: song.id,
        number: song.number,
        name: song.name,
        firstLine: song.firstLine,
        score: result.score
      }, null, 2)}</pre>
    );
  },
  _handleSearchSelect: function (result) {
    this.props.onPick(result.item);
  },
  _handleRandomSong: function () {
    this.props.onPick(Songs.random());
  }
});

module.exports = Radium(Picker);
