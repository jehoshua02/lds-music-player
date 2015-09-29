var scriptureUri = require('modules/scriptureUri');

var songs = [];

function fixCollectionId(song) {
  song.collectionId = song.id.split('-')[0];
}

function fixScriptures(song) {
  var scriptures = [];
  song.scriptures.forEach(function (scripture) {
    scripture.uri.split(/\r\n/).forEach(function (uri) {
      scripture = {
        uri: uri,
        ref: scriptureUri.toRef(uri),
        href: scriptureUri.toHref(uri)
      };
      scriptures.push(scripture);
    });
  });
  song.scriptures = scriptures;
}

function inject(song) {
  fixCollectionId(song);
  fixScriptures(song);
  songs.push(song);
}

// inject songs
require('data/Hymns-EN/269/Collection').items.forEach(inject);
require('data/Childrens-EN/275/Collection').items.forEach(inject);

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
