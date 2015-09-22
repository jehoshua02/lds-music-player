var React = require('react');
var SearchSelect = require('./SearchSelect');
var songs = require('../modules/songs');
var scriptureUri = require('../modules/scriptureUri');

var App = React.createClass({
  getInitialState: function () {
    return {
      song: songs.random(),
      vocals: true,
      continuous: false,
      autoPlay: false
    };
  },
  render: function () {
    var song = this.state.song;
    var mp3Key = this.state.vocals ? 'vocalMP3' : 'instrumentalMP3';
    return (
      <div>
        <SearchSelect
          search={this._searchSongs}
          renderResult={this._renderSearchResult}
          onSelect={this._handleSearchSelect}
        />
        <button onClick={this._handleRandomSong}>Random</button>
        <label>
          <input type="checkbox" checked={this.state.vocals} onChange={this._handleVocalsToggle} /> Vocals
        </label>
        <label>
          <input type="checkbox" checked={this.state.autoPlay} onChange={this._handleAutoPlayToggle} /> AutoPlay
        </label>
        <label>
          <input type="checkbox" checked={this.state.continuous} onChange={this._handleContinuousToggle} /> Continuous
        </label>
        {song !== null && (
          <div>
            <audio
              ref="audio"
              src={song.counterparts[mp3Key].url}
              controls
              autoPlay={this.state.autoPlay}
            />
            <iframe src={song.counterparts.singlePDF.url} />
            <ul>
              {song.scriptures.map(function (scripture, key) {
                var href = scriptureUri.toHref(scripture.uri);
                var text = scriptureUri.toRef(scripture.uri);
                return (
                  <li key={key}><a href={href} target="_blank">{text}</a></li>
                );
              }.bind(this))}
            </ul>
            <pre>{JSON.stringify(song, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  },
  componentDidMount: function () {
    this.refs.audio.getDOMNode().addEventListener('ended', this._handleEnded);
  },
  componentWillUnmount: function () {
    this.refs.audio.getDOMNode().removeEventListener('ended', this._handleEnded);
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
        if (paused) { audio.pause(); } else { audio.play(); }
      });
    }
  },
  _handleContinuousToggle: function () {
    this.setState({continuous: !this.state.continuous});
  },
  _handleAutoPlayToggle: function () {
    this.setState({autoPlay: !this.state.autoPlay});
  },
  _handleRandomSong: function () {
    this.setState({song: songs.random()});
  },
  _handleEnded: function () {
    this._handleRandomSong();
  }
});

module.exports = App;
