var React = require('react');
var T = React.PropTypes;
var Song = require('models/Song');
var Collection = require('models/Collection');

var Search = React.createClass({
  propTypes: {
    onSelect: T.func.isRequired
  },
  getInitialState: function () {
    return {
      value: ''
    };
  },
  render: function () {
    var results = this._search(this.state.value);
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
          <div className="search__results">
            {results.map(this._renderResult)}
          </div>
        )}
      </div>
    );
  },
  componentDidMount: function () {
    this.refs.input.getDOMNode().focus();
  },
  _search: function (value) {
    return Song.search(value).filter(function (result) {
      return result.score < 0.5;
    });
  },
  _renderResult: function (result, key) {
    var song = result.item;
    var collection = Collection.get(song.collectionId);
    return (
      <div className="search__result" onClick={this._handleSelect.bind(this, song)} key={key}>
        <h2 className="collection">{collection.shortName} {song.number}</h2>
        <h1 className="name">{song.name}</h1>
      </div>
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

module.exports = Search;
