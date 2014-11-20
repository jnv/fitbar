var curry = require('curry');

var zipWith = curry(function(fn, a, b){
    return a.map(function(val, i){ return fn(val, b[i]); });
});

var zip = zipWith(function(a, b) { return [a, b]; });

var arrFilter = Array.prototype.filter;

module.exports = {
  add: curry(function(a, b) {
    return a + b;
  }),
  extractFrom: curry(function(from, prop) {
    return from[prop];
  }),
  extractValue: curry(function(prop,from) {
    return from[prop];
  }),
  zipWith: zipWith,
  zip: zip,
  last: function(a) {
    return a[a.length - 1];
  },
  filter: curry(function(cb, collection) {
    if(collection) {
      return arrFilter.call(collection, cb);
    }
    return [];
  }),
  any: function(val) {
    return !!val;
  }
};
