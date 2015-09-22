var React = require('react');
var Picker = require('./Picker');
var Settings = require('./Settings');
var Song = require('./Song');
var Songs = require('../modules/Songs');

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
    var mp3Key = this.state.settings.vocals ? 'vocalMP3' : 'instrumentalMP3';
    return (
      <div>
        <Picker onPick={this._handleSongChange} />
        <Settings settings={this.state.settings} onChange={this._handleSettingsChange} />
        <Song
          ref="song"
          song={this.state.song}
          vocals={this.state.settings.vocals}
          autoPlay={this.state.settings.autoPlay}
          onEnd={this._handleSongEnd}
        />
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

module.exports = Player;
