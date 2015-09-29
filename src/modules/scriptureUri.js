function parseBook(uri) {
  return uri.match(/^\/scriptures\/.*?\/(.*?)\//)[1].toUpperCase();
}

function parseVerses(uri) {
  return uri.match(/\/([^\/]+)$/)[1];
}

function parseStartVerse(uri) {
  return uri.match(/\d+(?:\.(\d+))?[^\/]*?$/)[1] || 1;
}

module.exports.toRef = function (uri) {
  return parseBook(uri) + ' ' + parseVerses(uri).replace('.', ':');
};

module.exports.toHref = function (uri) {
  var hash = '#' + (parseStartVerse(uri) - 1);
  return '//lds.org' + uri.replace(/\([\d,-]+\)/, '') + hash;
};
