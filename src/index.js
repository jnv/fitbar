var m = require('mithril');
var bar = require('./bar');
var curry = require('curry');
var pipe = require('functional-pipeline');

function valToNum(val) {
  return +val.replace('px', '');
}

var add = curry(function(a, b) {
  return a + b;
});

var extract = curry(function(from, prop) {
  return from[prop];
});


var zipWith = curry(function(fn, a, b){
    return a.map(function(val, i){ return fn(val, b[i]); });
});

var zip = zipWith(function(a, b) { return [a, b]; });

function outerSizes(el) {

  var dirs = ['Left', 'Right', 'Top'];
  var style = window.getComputedStyle(el);

  var sizesFor = function(prop) {
    var transform = pipe(add(prop), extract(style), valToNum);
    return dirs.map(transform);
  };

  var sizes = zipWith(add, sizesFor('margin'), sizesFor('padding'));
  return zip(dirs, sizes).reduce(function(obj, vals){
    var key = vals[0],
        size = vals[1];
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

  for(var dir in sizes) {
    var size = sizes[dir];
    root.style['margin' + dir] = '-' + size + 'px';
  }

  // append root element as a first element into body
  // TODO: possibly defer it if there are some further additions to the body?
  document.body.insertBefore(root, document.body.firstElementChild);
});
