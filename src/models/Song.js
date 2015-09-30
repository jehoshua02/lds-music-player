var Fuse = require('fuse.js');
var randomInt = require('random-int');
var Scripture = require('./Scripture');

class Song {
  constructor(data) {
    this._data = data;
  }
  get id() {
    return this._data.id;
  }
  get name() {
    return this._data.name;
  }
  get number() {
    return this._data.number;
  }
  get scriptures() {
    return this._data.scriptures.map(function (data) {
      return new Scripture(data);
    });
  }
  get pdf() {
    return this._data.counterparts.singlePDF.url;
  }
  get vocalMP3() {
    return this._data.counterparts.vocalMP3.url;
  }
  get instrumentalMP3() {
    return this._data.counterparts.instrumentalMP3.url;
  }
  get collectionId() {
    return this._data.collectionId;
  }
}

class SongMapper {
  constructor() {
    this._songs = [];
  }
  search(value) {
    var fuse = new Fuse(this._songs, {
      keys: ['name', 'number', 'firstLine'],
      includeScore: true
    });
    return fuse.search(value).map(function (result) {
      result.item = this._initModel(result.item);
      return result;
    }.bind(this));
  }
  random() {
    var data = this._songs[randomInt(0, this._songs.length - 1)];
    return this._initModel(data);
  }
  next(song) {
    var ids = this._songs.map(function (song) { return song.id; });
    var index = ids.indexOf(song.id) + 1;
    if (index === this._songs.length) { index = 0; }
    var data = this._songs[index];
    return this._initModel(data);
  }
  _inject(data) {
    this._songs.push(data);
  }
  _fixScriptures(prevScriptures) {
    var scriptures = [];
    prevScriptures.forEach(function (scripture) {
      scripture.uri.split(/\r\n/).forEach(function (uri) {
        scriptures.push({uri: uri});
      });
    });
    return scriptures;
  }
  _initModel(data) {
    data.collectionId = data.id.split('-')[0];
    data.scriptures = this._fixScriptures(data.scriptures);
    return new Song(data);
  }
}

var mapper = new SongMapper();
require('data/Hymns-EN/269/Collection').items.forEach(mapper._inject.bind(mapper));
require('data/Childrens-EN/275/Collection').items.forEach(mapper._inject.bind(mapper));

module.exports.search = mapper.search.bind(mapper);
module.exports.random = mapper.random.bind(mapper);
module.exports.next = mapper.next.bind(mapper);
