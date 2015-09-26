var React = require('react');
var Radium = require('radium');
var Search = require('components/Search');
var Settings = require('components/Settings');
var Audio = require('components/Audio');
var Songs = require('modules/Songs');
var scriptureUri = require('modules/scriptureUri');

var Player = React.createClass({
  getInitialState: function () {
    return {
      song: Songs.random(),
      settings: {
        vocals: true,
        continuous: false,
        autoPlay: false,
        random: false,
      }
    };
  },
  render: function () {
    var song = this.state.song;
    return (
      <div>

        <Search
          onSelect={this._handleSongSelect}
        />

        <button onClick={this._handleNextSong}>Next</button>

        <Settings
          settings={this.state.settings}
          onChange={this._handleSettingsChange}
        />

        <Audio
          ref="song"
          src={{
            vocal: song.counterparts.vocalMP3.url,
            instrumental: song.counterparts.instrumentalMP3.url
          }}
          vocals={this.state.settings.vocals}
          autoPlay={this.state.settings.autoPlay}
          onEnd={this._handleSongEnd}
        />

        {song.scriptures.length > 0 && (
          <ul>
            {song.scriptures.map(function (scripture, key) {
              var href = scriptureUri.toHref(scripture.uri);
              var text = scriptureUri.toRef(scripture.uri);
              return (
                <li key={key}>
                  <a href={href} target="_blank">{text}</a>
                </li>
              );
            }.bind(this))}
          </ul>
        )}

        <iframe src={song.counterparts.singlePDF.url} />

      </div>
    );
  },
  _handleSettingsChange: function (settings) {
    this.setState({settings: settings});
  },
  _handleSongSelect: function (song) {
    this.setState({song: song});
  },
  _handleSongEnd: function () {
    if (this.state.settings.continuous === true) {
      this._handleNextSong();
    }
  },
  _handleNextSong: function () {
    if (this.state.settings.random) {
      this.setState({song: Songs.random()});
    } else {
      this.setState({song: Songs.next(this.state.song)});
    }
  }
});

module.exports = Radium(Player);
