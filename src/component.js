'use strict';
var m = require('mithril');

var PREFIX = 'fitbar-';

// TODO: Yield pure JSON-like struct to m()
module.exports = function component(name, attrs, children) {
  if (attrs instanceof Array) {
    children = attrs;
    attrs = {};
  }

  attrs = attrs || {};
  var tag = attrs.tag || 'div';
  var state = attrs.state;
  var classes = attrs.class;
  var mod = attrs.mod;
  delete attrs.tag;
  delete attrs.state;
  delete attrs.mod;

  var prefixedName = PREFIX + name;
  if (mod) {
    mod = prefixedName + '--' + mod;
  }
  if (state) {
    state = 'is-' + state;
  }

  attrs.class = [prefixedName, mod, state, classes].join(' ');

  return m(tag, attrs, children);
};
