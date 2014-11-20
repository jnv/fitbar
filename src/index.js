'use strict';
var m = require('mithril');
var bar = require('./bar');
var pipe = require('functional-pipeline');
var u = require('./util');
var reinsert = require('./reinsert');

function valToNum(val) {
  return +val.replace('px', '');
}

function outerSizes(el) {

  var dirs = ['Left', 'Right', 'Top'];
  var style = window.getComputedStyle(el);

  var sizesFor = function(prop) {
    var transform = pipe(u.add(prop), u.extractFrom(style), valToNum);
    return dirs.map(transform);
  };

  var sizes = u.zipWith(u.add, sizesFor('margin'), sizesFor('padding'));
  return u.zip(dirs, sizes).reduce(function(obj, vals){
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

function prependRoot(body) {
  body.insertBefore(root, body.firstElementChild);
}


// once DOM is ready, elements can be appended
require('domready')(function inject() {
  // apply negative margins for root container
  var sizes = outerSizes(document.body);

  for(var dir in sizes) {
    var size = sizes[dir];
    root.style['margin' + dir] = '-' + size + 'px';
  }

  // prepend root element as a first element into body
  // TODO: possibly defer it if there are some further additions to the body?
  prependRoot(document.body);

  reinsert(document.documentElement, prependRoot);

  // document.body.addEventListener('DOMNodeRemoved', function(e){ console.log(e); } );
  // window.setInterval(function() {
  //   if(root.parentElement !== document.body) {
  //     prependRoot(document.body);
  //   }
  // }, 500);

});
