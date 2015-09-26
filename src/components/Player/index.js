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
      <div>
        <div>
          <button onClick={this._handleOpenPanel.bind(this, 'search')}>Search</button>
          <button onClick={this._handleOpenPanel.bind(this, 'settings')}>Settings</button>
          <button onClick={this._handleOpenPanel.bind(this, 'scriptures')}>Scriptures</button>
          <button onClick={this._handleNextSong}>Next</button>
        </div>

        <div>
          <div open={this.state.panel !== this.getInitialState().panel}>
            <span onClick={this._handlePanelClose}>Close</span>
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

          <iframe src={song.counterparts.singlePDF.url} />
        </div>

        <div>
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
  _handleOpenPanel: function (which) {
    this.setState({panel: which});
  },
  _handlePanelClose: function () {
    this.setState({panel: this.getInitialState().panel});
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

module.exports = Player;
