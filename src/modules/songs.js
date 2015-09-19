var Fuse = require('fuse.js');

var songs = [];
songs = songs.concat(require('../data/Hymns-EN/269/Collection').items);
songs = songs.concat(require('../data/Childrens-EN/275/Collection').items);

var fuse = new Fuse(songs, {
  keys: ['name', 'number', 'firstLine'],
  includeScore: true
});

module.exports = fuse;
