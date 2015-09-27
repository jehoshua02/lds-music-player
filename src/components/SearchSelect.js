var React = require('react');
var T = React.PropTypes;

var SearchSelect = React.createClass({
  propTypes: {
    search: T.func.isRequired,
    renderResult: T.func.isRequired,
    onSelect: T.func.isRequired,
    focus: T.bool
  },
  getDefaultProps: function () {
    return {
      focus: false
    };
  },
  getInitialState: function () {
    return {
      value: ''
    };
  },
  render: function () {
    var results = this.props.search(this.state.value);
    return (
      <div className="search">
        <input
          className="search__input"
          ref="input"
          type="text"
          placeholder="Search"
          onChange={this._handleChange}
        />
        {results.length > 0 && (
          <ul className="search__results">
            {results.map(function (result, key) {
              return (
                <li
                  className="search__result"
                  key={key}
                  onClick={this._handleSelect.bind(this, result)}
                >{this.props.renderResult(result)}</li>
              );
            }.bind(this))}
          </ul>
        )}
      </div>
    );
  },
  componentDidMount: function () {
    this._applyFocus();
  },
  componentDidUpdate: function (prevProps) {
    this._applyFocus();
  },
  _handleChange: function (e) {
    this.setState({value: e.target.value});
  },
  _handleSelect: function (result) {
    this.setState(this.getInitialState());
    this.props.onSelect(result);
  },
  _applyFocus: function () {
    if (this.props.focus) {
      this.refs.input.getDOMNode().focus();
    }
  }
});

module.exports = SearchSelect;
