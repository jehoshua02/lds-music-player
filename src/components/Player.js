var React = require('react');
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
        random: false
      },
      panel: null
    };
  },
  render: function () {
    var song = this.state.song;
    return (
      <div className="player">
        <div className="player__head">
          <button className="player__head-item" onClick={this._handlePanelToggle.bind(this, 'search')}>Search</button>
          <button className="player__head-item" onClick={this._handlePanelToggle.bind(this, 'settings')}>Settings</button>
          <button className="player__head-item" onClick={this._handlePanelToggle.bind(this, 'scriptures')}>Scriptures</button>
          <button className="player__head-item" onClick={this._handleNextSong}>Next</button>
        </div>

        <div className="player__body">
          <div className={[
            'player__panel',
            this.state.panel && 'player__panel--open'
          ].filter(function (item) { return !!item; }).join(' ')}>
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

          <iframe className="player__sheet-music" src={song.counterparts.singlePDF.url} />
        </div>

        <div className="player__foot">
          <Audio
            src={{
              vocal: song.counterparts.vocalMP3.url,
              instrumental: song.counterparts.instrumentalMP3.url
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
    if (this.state.panel === which) {
      which = null;
    }
    this.setState({panel: which});
  },
  _handlePanelClose: function () {
    this.setState({panel: null});
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
    this._handlePanelClose();
    if (this.state.settings.random) {
      this.setState({song: Songs.random()});
    } else {
      this.setState({song: Songs.next(this.state.song)});
    }
  }
});

module.exports = Player;
