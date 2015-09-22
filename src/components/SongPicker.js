var React = require('react');
var T = React.PropTypes;
var SearchSelect = require('./SearchSelect');
var songs = require('../modules/songs');

var SongPicker = React.createClass({
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
    this.props.onPick(songs.random());
  },
  _searchSongs: function (value) {
    return songs.search(value).filter(function (result) {
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
    this.props.onPick(songs.random());
  }
});

module.exports = SongPicker;
