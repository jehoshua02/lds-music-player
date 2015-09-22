var React = require('react');
var T = React.PropTypes;
var scriptureUri = require('modules/scriptureUri');
var styles = require('./styles');

var Song = React.createClass({
  propTypes: {
    song: T.object.isRequired
  },
  getInitialState: function () {
    return {
      currentTime: null,
      paused: null
    };
  },
  render: function () {
    var song = this.props.song;
    var mp3Key = this.props.vocals ? 'vocalMP3' : 'instrumentalMP3';
    return (
      <div>
        <audio
          ref="audio"
          src={song.counterparts[mp3Key].url}
          controls
          autoPlay={this.props.autoPlay}
        />
        <iframe src={song.counterparts.singlePDF.url} />
        {song.scriptures.length > 0 && (
          <ul>
            {song.scriptures.map(function (scripture, key) {
              var href = scriptureUri.toHref(scripture.uri);
              var text = scriptureUri.toRef(scripture.uri);
              return (
                <li key={key}><a href={href} target="_blank">{text}</a></li>
              );
            }.bind(this))}
          </ul>
        )}
        <pre>{JSON.stringify(song, null, 2)}</pre>
      </div>
    );
  },
  componentDidMount: function () {
    this._audioNode().addEventListener('ended', this.props.onEnd);
  },
  componentWillUnmount: function () {
    this._audioNode().removeEventListener('ended', this.props.onEnd);
  },
  componentWillReceiveProps: function (nextProps) {
    if (nextProps.vocals !== this.props.vocals) {
      this._captureAudioState();
    }
  },
  componentDidUpdate: function (prevProps) {
    if (this.props.vocals !== prevProps.vocals) {
      this._applyAudioState();
    }
  },
  _captureAudioState: function () {
    var audio = this._audioNode();
    this.setState({
      currentTime: audio.currentTime,
      paused: audio.paused
    });
  },
  _applyAudioState: function () {
    var audio = this._audioNode();
    audio.currentTime = this.state.currentTime;
    if (this.state.paused) { audio.pause(); } else { audio.play(); }
    this.setState(this.getInitialState());
  },
  _audioNode: function () {
    return this.refs.audio.getDOMNode();
  }
});

module.exports = Song;
