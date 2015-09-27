var songs = [];

// inject hymns
require('data/Hymns-EN/269/Collection').items.forEach(function (song) {
  song.collectionId = 'Hymns';
  songs.push(song);
});

// inject childrens
require('data/Childrens-EN/275/Collection').items.forEach(function (song) {
  song.collectionId = 'Hymns';
  songs.push(song);
});

// search
var Fuse = require('fuse.js');
var fuse = new Fuse(songs, {
  keys: ['name', 'number', 'firstLine'],
  includeScore: true
});
module.exports.search = function (value) {
  return fuse.search(value);
};

// random
var randomInt = require('random-int');
module.exports.random = function () {
  return songs[randomInt(0, songs.length - 1)];
};

// next
var ids = songs.map(function (song) { return song.id; });
module.exports.next = function (song) {
  var index = ids.indexOf(song.id) + 1;
  if (index === songs.length) { index = 0; }
  return songs[index];
};
