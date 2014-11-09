var zip = require('lodash-node/modern/arrays/zip');
var forEach = require('lodash-node/modern/collections/forEach');
var m = require('mithril');
var bar = require('./bar');


function valToNum(val) {
  return +val.replace('px', '');
}

function concat(prefix) {
    return function(suffix) {
      return prefix + suffix;
    };
  }

function extract(from) {
  return function(property) {
    return from[property];
  };
}

function outerSizes(el) {

  var style = window.getComputedStyle(el);

  var dims = ['Left', 'Right', 'Top'];
  var margins = dims.map(concat('margin')).map(extract(style)).map(valToNum);
  var paddings = dims.map(concat('padding')).map(extract(style)).map(valToNum);

  return zip(dims, margins, paddings).reduce(function(obj, vals){
    var key = vals[0],
        size = vals[1] + vals[2];
    obj[key] = size;
    return obj;
  }, {});
}


// preparation phase
var root = document.createElement('div');
root.className = 'fitbar-Root';

// render bar into a root element
m.module(root, bar);

// once DOM is ready, elements can be appended
document.addEventListener('DOMContentLoaded', function inject() {
  // apply negative margins for root container
  var sizes = outerSizes(document.body);

  forEach(sizes, function(size, dimension) {
    root.style['margin' + dimension] = '-' + size + 'px';
  });

  // append root element as a first element into body
  // TODO: possibly defer it if there are some further additions to the body?
  document.body.insertBefore(root, document.body.firstElementChild);
});
