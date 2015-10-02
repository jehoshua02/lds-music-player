var React = require('react');
var T = React.PropTypes;
var Search = require('components/Search');
var Settings = require('components/Settings');
var Audio = require('components/Audio');
var Song = require('models/Song');
var cx = require('modules/className');
var history = require('modules/history');

var Player = React.createClass({
  propTypes: {
    params: T.shape({
      id: T.string.isRequired
    }).isRequired
  },
  getInitialState: function () {
    return {
      song: null,
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
            {this.state.panel === 'scriptures' && this.state.song && (
              <div className="scriptures">
                {this.state.song.scriptures.map(function (scripture, key) {
                  return (
                    <a className="panel__item" href={scripture.href} target="_blank" key={key}>{scripture.ref}</a>
                  );
                }.bind(this))}
              </div>
            )}
          </div>

          {this.state.song && this.state.song.pdf ? (
            <iframe className="player__sheet-music" src={this.state.song.pdf} />
          ) : this.state.song && this.state.song.verses ? (
            <div className="player__sheet-music">
              {this.state.song.verses.map(function (verse, key) {
                return <p key={key}>{verse.text}</p>;
              })}
            </div>
          ) : <div className="player__sheet-music">No Sheet Music</div>}
        </div>

        <div className="player__foot">
          {this.state.song && (this.state.song.vocalMP3 || this.state.song.instrumentalMP3) && (
            <Audio
              src={{
                vocal: this.state.song.vocalMP3,
                instrumental: this.state.song.instrumentalMP3
              }}
              vocals={this.state.settings.vocals}
              autoPlay={this.state.settings.autoPlay}
              onEnd={this._handleSongEnd}
            />
          )}
        </div>
      </div>
    );
  },
  componentDidMount: function () {
    this._fetchSong();
  },
  componentDidUpdate: function (prevProps) {
    if (this.props.params.id !== prevProps.params.id) {
      this._fetchSong();
    }
  },
  _fetchSong: function (id) {
    this.setState({song: Song.get(this.props.params.id)});
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
    this._routeSong(song);
  },
  _handleSongEnd: function () {
    if (this.state.settings.continuous === true) {
      this._handleNextSong();
    }
  },
  _handleNextSong: function () {
    this._handlePanelClose();
    var song = (this.state.settings.random) ? Song.random() : Song.next(this.state.song);
    this._routeSong(song);
  },
  _routeSong: function (song) {
    history.replaceState(null, '/' + song.id.toLowerCase());
  }
});

module.exports = Player;
