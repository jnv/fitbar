'use strict';

var ICONS = require('fit-icons');

function icon(key) {
  return ICONS[key] || '';
}

module.exports = icon;
