var Fuse = require('fuse.js');
var randomInt = require('random-int');

var songs = [];
songs = songs.concat(require('../data/Hymns-EN/269/Collection').items);
songs = songs.concat(require('../data/Childrens-EN/275/Collection').items);

var fuse = new Fuse(songs, {
  keys: ['name', 'number', 'firstLine'],
  includeScore: true
});

module.exports.search = function (value) {
  return fuse.search(value);
};

module.exports.random = function () {
  return songs[randomInt(0, songs.length - 1)];
};
