class Scripture {
  constructor(data) {
    this._data = data;
  }
  get ref() {
    var uri = this._data.uri;
    return this._parseBook(uri) + ' ' + this._parseVerses(uri).replace('.', ':');
  }
  get href() {
    var uri = this._data.uri;
    var hash = '#' + (this._parseStartVerse(uri) - 1);
    return '//lds.org' + uri.replace(/\([\d,-]+\)/, '') + hash;
  }
  _parseBook(uri) {
    return uri.match(/^\/scriptures\/.*?\/(.*?)\//)[1].toUpperCase();
  }
  _parseVerses(uri) {
    return uri.match(/\/([^\/]+)$/)[1];
  }
  _parseStartVerse(uri) {
    return uri.match(/\d+(?:\.(\d+))?[^\/]*?$/)[1] || 1;
  }
}

module.exports = Scripture;
