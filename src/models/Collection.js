var collections = [];

var data;

// inject hymns
data = require('data/Hymns-EN/269/Collection');
data.id = 'Hymns';
collections.push(data);

// inject childrens
data = require('data/Childrens-EN/275/Collection');
data.id = 'Childrens';
collections.push(data);

module.exports.get = function (id) {
  var matches = collections.filter(function (item) {
    return item.id === id;
  });
  return (matches.length === 0) ? false : matches[0];
};
