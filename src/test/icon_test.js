'use strict';
var test = require('tape');
var icon = require('../icon');


test('exposes SVG icons as strings', function(t) {
  var i = icon('settings');
  t.assert(i.match(/<svg /i), 'returns an SVG element');
  t.equal(icon('non-existent-icon'), '',
          'returns empty string if icon does not exist');
  t.end();
});
