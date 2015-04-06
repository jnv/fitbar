'use strict';

var ICONS = require('fit-icons');
var mc = require('../component');
var trust = require('mithril').trust;

function icon(key) {
  return ICONS[key] || '';
}

function component(key) {
  var ico = icon(key);
  if (ico) {
    return mc('Icon', {tag: 'span', mod: key}, trust(ico));
  }
  return '';
}

module.exports = icon;
module.exports.mc = component;
