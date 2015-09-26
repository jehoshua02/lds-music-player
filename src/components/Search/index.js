var React = require('react');
var T = React.PropTypes;
var SearchSelect = require('components/SearchSelect');
var Songs = require('modules/Songs');

var Search = React.createClass({
  propTypes: {
    onSelect: T.func.isRequired
  },
  render: function () {
    return (
      <span>
        <SearchSelect
          search={this._searchSongs}
          renderResult={this._renderSearchResult}
          onSelect={this._handleSearchSelect}
        />
      </span>
    );
  },
  componentDidMount: function () {
    this.props.onSelect(Songs.random());
  },
  _searchSongs: function (value) {
    return Songs.search(value).filter(function (result) {
      return result.score < 0.5;
    });
  },
  _renderSearchResult: function (result) {
    var song = result.item;
    return (
      <pre>{JSON.stringify({
        id: song.id,
        number: song.number,
        name: song.name,
        firstLine: song.firstLine,
        score: result.score
      }, null, 2)}</pre>
    );
  },
  _handleSearchSelect: function (result) {
    this.props.onSelect(result.item);
  }
});

module.exports = Search;
