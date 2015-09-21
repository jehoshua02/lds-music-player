var React = require('react');
var SearchSelect = require('./SearchSelect');
var songs = require('../modules/songs');

var App = React.createClass({
  getInitialState: function () {
    return {
      song: null,
      vocals: true
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
        <label>
          <input type="checkbox" checked={this.state.vocals} onChange={this._handleVocalsToggle} /> Vocals
        </label>
        {this.state.song !== null && (
          <div>
            <audio
              ref="audio"
              src={this.state.vocals ? this.state.song.counterparts.vocalMP3.url : this.state.song.counterparts.instrumentalMP3.url}
              controls
              autoPlay
            />
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
  },
  _handleVocalsToggle: function () {
    if (!this.refs.audio) {
      this.setState({vocals: !this.state.vocals});
    } else {
      var audio = this.refs.audio.getDOMNode();
      var currentTime = audio.currentTime;
      var paused = audio.paused;
      this.setState({vocals: !this.state.vocals}, function () {
        audio.currentTime = currentTime;
        setTimeout(function () {
          if (paused) {
            audio.pause();
          } else {
            audio.play();
          }
        }, 0);
      });
    }
  }
});

module.exports = App;
