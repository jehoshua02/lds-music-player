var React = require('react');
var Search = require('components/Search');
var Settings = require('components/Settings');
var Audio = require('components/Audio');
var Songs = require('models/Song');
var cx = require('modules/className');

var Player = React.createClass({
  getInitialState: function () {
    return {
      song: Songs.random(),
      settings: {
        vocals: true,
        continuous: false,
        autoPlay: false,
        random: true
      },
      panel: null
    };
  },
  render: function () {
    var song = this.state.song;
    return (
      <div className="player">
        <div className="player__head">
          <button className={cx(
            'player__head-item',
            this.state.panel === 'search' && 'player__head-item--active'
          )} onClick={this._handlePanelToggle.bind(this, 'search')}>Search</button>
          <button className={cx(
            'player__head-item',
            this.state.panel === 'settings' && 'player__head-item--active'
          )} onClick={this._handlePanelToggle.bind(this, 'settings')}>Settings</button>
          <button className={cx(
            'player__head-item',
            this.state.panel === 'scriptures' && 'player__head-item--active'
          )} onClick={this._handlePanelToggle.bind(this, 'scriptures')}>Scriptures</button>
          <button className="player__head-item" onClick={this._handleNextSong}>Next</button>
        </div>

        <div className="player__body">
          <div className={cx(
            'panel',
            this.state.panel && 'panel--open'
          )}>
            {this.state.panel === 'search' && (
              <Search onSelect={this._handleSongSelect} />
            )}
            {this.state.panel === 'settings' && (
              <Settings
                settings={this.state.settings}
                onChange={this._handleSettingsChange}
              />
            )}
            {this.state.panel === 'scriptures' && (
              <div className="scriptures">
                {song.scriptures.map(function (scripture, key) {
                  return (
                    <a className="panel__item" href={scripture.href} target="_blank" key={key}>{scripture.ref}</a>
                  );
                }.bind(this))}
              </div>
            )}
          </div>

          <iframe className="player__sheet-music" src={song.pdf} />
        </div>

        <div className="player__foot">
          <Audio
            src={{
              vocal: song.vocalMP3,
              instrumental: song.instrumentalMP3
            }}
            vocals={this.state.settings.vocals}
            autoPlay={this.state.settings.autoPlay}
            onEnd={this._handleSongEnd}
          />
        </div>
      </div>
    );
  },
  _handlePanelToggle: function (which) {
    if (this.state.panel === which) { which = null; }
    this.setState({panel: which});
  },
  _handlePanelClose: function () {
    this.setState({panel: null});
  },
  _handleSettingsChange: function (settings) {
    this.setState({settings: settings});
  },
  _handleSongSelect: function (song) {
    this._handlePanelClose();
    this.setState({song: song});
  },
  _handleSongEnd: function () {
    if (this.state.settings.continuous === true) {
      this._handleNextSong();
    }
  },
  _handleNextSong: function () {
    this._handlePanelClose();
    if (this.state.settings.random) {
      this.setState({song: Songs.random()});
    } else {
      this.setState({song: Songs.next(this.state.song)});
    }
  }
});

module.exports = Player;
