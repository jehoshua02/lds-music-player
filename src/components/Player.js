var React = require('react');
var Picker = require('./Picker');
var Song = require('./Song');
var Songs = require('../modules/Songs');

var Player = React.createClass({
  getInitialState: function () {
    return {
      song: Songs.random(),
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
        <Picker onPick={this._handleSongChange} />
        <div>
          <label>
            <input type="checkbox" checked={this.state.vocals} onChange={this._handleVocalsToggle} /> Vocals
          </label>
          <label>
            <input type="checkbox" checked={this.state.autoPlay} onChange={this._handleAutoPlayToggle} /> AutoPlay
          </label>
          <label>
            <input type="checkbox" checked={this.state.continuous} onChange={this._handleContinuousToggle} /> Continuous
          </label>
        </div>
        <Song
          ref="song"
          song={this.state.song}
          vocals={this.state.vocals}
          autoPlay={this.state.autoPlay}
          onEnd={this._handleSongEnd}
        />
      </div>
    );
  },
  _handleSongChange: function (song) {
    this.setState({song: song});
  },
  _handleVocalsToggle: function () {
    this.setState({vocals: !this.state.vocals});
  },
  _handleContinuousToggle: function () {
    this.setState({continuous: !this.state.continuous});
  },
  _handleAutoPlayToggle: function () {
    this.setState({autoPlay: !this.state.autoPlay});
  },
  _handleSongEnd: function () {
    if (this.state.continuous === true) {
      this.setState({song: Songs.random()});
    }
  }
});

module.exports = Player;
