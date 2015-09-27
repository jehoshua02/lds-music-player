var DS = require('models/DS');

var Collection = DS.defineResource({
  name: 'collection',
  relations: {
    hasMany: {
      song: {
        localField: 'songs',
        foreignKey: 'collectionId'
      }
    }
  }
});

var data;

// inject hymns
data = require('data/Hymns-EN/269/Collection');
data.id = 'Hymns';
Collection.inject(data);

// inject childrens
data = require('data/Childrens-EN/275/Collection');
data.id = 'Childrens';
Collection.inject(data);

module.exports = Collection;
