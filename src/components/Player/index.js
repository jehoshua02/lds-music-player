var React = require('react');
var Radium = require('radium');
var Picker = require('components/Picker');
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
        autoPlay: false
      }
    };
  },
  render: function () {
    var song = this.state.song;
    console.log(song);
    return (
      <div>

        <Picker
          onPick={this._handleSongChange}
        />

        <Settings
          settings={this.state.settings}
          onChange={this._handleSettingsChange}
        />

        <iframe src={song.counterparts.singlePDF.url} />

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
      </div>
    );
  },
  _handleSongChange: function (song) {
    this.setState({song: song});
  },
  _handleSongEnd: function () {
    if (this.state.settings.continuous === true) {
      this.setState({song: Songs.random()});
    }
  },
  _handleSettingsChange: function (settings) {
    this.setState({settings: settings});
  }
});

module.exports = Radium(Player);
