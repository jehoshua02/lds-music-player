function parseUri(uri) {
  var parts = uri.split('/');
  return {
    work: parts[2].toUpperCase(),
    book: parts[3],
    verse: parts[4]
  };
}

module.exports.toRef = function (uri) {
  var parts = parseUri(uri);
  return parts.book.toUpperCase() + ' ' + parts.verse.replace('.', ':');
};

module.exports.toHref = function (uri) {
  var parts = parseUri(uri);
  var start = parseInt(parts.verse.match(/^\d+\.(\d+).*$/)[1]);
  var hash = '#' + (start - 1);
  return '//lds.org' + uri + hash;
};
