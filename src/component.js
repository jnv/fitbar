'use strict';
var m = require('mithril');

var PREFIX = 'fitbar-';

module.exports = function component(name, attrs, children) {
  if(attrs instanceof Array) {
    children = attrs;
    attrs = {};
  }

  attrs = attrs || {};
  var tag = attrs.tag || 'div';
  var state = attrs.state || '';
  var classes = attrs.class || '';
  delete attrs.tag;
  delete attrs.state;
  if(state) {
    state = 'is-' + state;
  }

  attrs.class = PREFIX + name + ' ' + state + ' ' + classes;

  return m(tag, attrs, children);
}
