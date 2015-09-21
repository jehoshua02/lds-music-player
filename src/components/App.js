var React = require('react');
var SearchSelect = require('./SearchSelect');
var songs = require('../modules/songs');

var App = React.createClass({
  getInitialState: function () {
    return {
      song: null
    };
  },
  render: function () {
    return (
      <div>
        <SearchSelect
          search={this._searchSongs}
          renderResult={this._renderSearchResult}
          onSelect={this._handleSearchSelect}
        />
        {this.state.song !== null && (
          <div>
            <iframe src={this.state.song.counterparts.singlePDF.url} />
            <pre>{JSON.stringify(this.state.song, null, 2)}</pre>
          </div>
        )}
      </div>
    );
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
  _searchSongs: function (value) {
    return songs.search(value).filter(function (result) {
      return result.score < 0.5;
    });
  },
  _handleSearchSelect: function (result) {
    this.setState({song: result.item});
  }
});

module.exports = App;
