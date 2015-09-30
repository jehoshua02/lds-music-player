class Collection {
  constructor(data) {
    this._data = data;
  }
  get shortName() {
    return this._data.shortName;
  }
}

class CollectionMapper {
  constructor() {
    this._collections = [];
  }
  get(id) {
    var matches = this._collections.filter(function (item) {
      return item.id === id;
    });
    return (matches.length === 0) ? false : this._initModel(matches[0]);
  }
  _inject(data, id) {
    data.id = id;
    this._collections.push(data);
  }
  _initModel(data) {
    return new Collection(data);
  }
}

var mapper = new CollectionMapper();
mapper._inject(require('data/Hymns-EN/269/Collection'), 'Hymns');
mapper._inject(require('data/Childrens-EN/275/Collection'), 'Childrens');

module.exports.get = mapper.get.bind(mapper);
