'use strict';
var test = require('tape');
var icon = require('../icon');
var mq = require('mithril-query');

test('creates an icon component', function(t) {
  var i = icon('settings');
  var $i = mq(i);
  t.ok($i.has('span'), 'icon is a span');
  t.ok($i.has(':root[class~=fitbar-Icon]'), 'icon has a prefixed Icon class');
  t.ok($i.has(':root[class~=fitbar-Icon--settings]'), 'icon has a class of given variation');
  t.ok($i.has('span:contains("")'), 'icon is an empty node');
  t.end();
});
