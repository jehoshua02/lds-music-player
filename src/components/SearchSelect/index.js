var React = require('react');
var T = React.PropTypes;

var SearchSelect = React.createClass({
  propTypes: {
    search: T.func.isRequired,
    renderResult: T.func.isRequired,
    onSelect: T.func.isRequired
  },
  getInitialState: function () {
    return {
      value: ''
    };
  },
  render: function () {
    var results = this.props.search(this.state.value);
    return (
      <span>
        <input
          type="text"
          placeholder="Search"
          onChange={this._handleChange}
        />
        {results.length > 0 && (
          <ul>
            {results.map(function (result, key) {
              return (
                <li
                  key={key}
                  onClick={this._handleSelect.bind(this, result)}
                >{this.props.renderResult(result)}</li>
              );
            }.bind(this))}
          </ul>
        )}
      </span>
    );
  },
  _handleChange: function (e) {
    this.setState({value: e.target.value});
  },
  _handleSelect: function (result) {
    this.setState(this.getInitialState());
    this.props.onSelect(result);
  }
});

module.exports = SearchSelect;
