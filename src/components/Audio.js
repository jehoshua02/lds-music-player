var React = require('react');
var T = React.PropTypes;

var Audio = React.createClass({
  propTypes: {
    src: T.shape({
      vocal: T.string.isRequired,
      instrumental: T.string.isRequired,
    }).isRequired,
    vocals: T.bool.isRequired,
    autoPlay: T.bool.isRequired,
    onEnd: T.func.isRequired,
  },
  getInitialState: function () {
    return {
      currentTime: null,
      paused: null
    };
  },
  render: function () {
    var src = this.props.src[this.props.vocals ? 'vocal' : 'instrumental'];
    return (
      <audio
        ref="audio"
        src={src}
        controls
        autoPlay={this.props.autoPlay}
      />
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

module.exports = Audio;
