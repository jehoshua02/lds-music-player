var React = require('react');
var T = React.PropTypes;

var Settings = React.createClass({
  propTypes: {
    settings: T.shape({
      vocals: T.bool.isRequired,
      autoPlay: T.bool.isRequired,
      continuous: T.bool.isRequired,
      random: T.bool.isRequired,
    }).isRequired,
    onChange: T.func.isRequired
  },
  render: function () {
    return (
      <div>
        <label>
          <input
            type="checkbox"
            checked={this.props.settings.vocals}
            onChange={this._toggle.bind(this, 'vocals')}
          /> Vocals
        </label>
        <label>
          <input
            type="checkbox"
            checked={this.props.settings.autoPlay}
            onChange={this._toggle.bind(this, 'autoPlay')}
          /> AutoPlay
        </label>
        <label>
          <input
            type="checkbox"
            checked={this.props.settings.continuous}
            onChange={this._toggle.bind(this, 'continuous')}
          /> Continuous
        </label>
        <label>
          <input
            type="checkbox"
            checked={this.props.settings.random}
            onChange={this._toggle.bind(this, 'random')}
          /> Random
        </label>
      </div>
    );
  },
  _toggle: function (key) {
    var settings = Object.assign({}, this.props.settings);
    settings[key] = !settings[key];
    this.props.onChange(settings);
  }
});

module.exports = Settings;
