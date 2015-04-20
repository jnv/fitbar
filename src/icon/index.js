'use strict';

var mc = require('../component');


function icon(key) {
  return mc('Icon', {tag: 'span', mod: key, role: 'img', 'aria-label': key});
}

module.exports = icon;
