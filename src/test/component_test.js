var test = require('tape');
var _ = require('lodash');
var mc = require('../component');

test('creates virtual element with classes', function(t) {
  var e = mc('Dropdown', {state: 'open', class: 'original-class another', click: function(){} });
  var classes = e.attrs.class.split(' ');

  t.equal(e.tag, 'div', 'expected to be div by default');

  var expectedClasses = ['fitbar-Dropdown', 'is-open', 'original-class', 'another'];

  t.assert((_.difference(classes, expectedClasses).length === 0), 'expected classes to be equivalent');

  t.end();
});

test('sets tag name', function(t) {
  var e = mc('Link', {tag: 'span'});
  t.equal(e.tag, 'span', 'expected to be a span');
  t.end();
})

test('allows children as a second argument', function(t) {
  var e = mc('Dropdown', [mc('Dropdown-link')]);

  t.equal(e.attrs.class.trim(), 'fitbar-Dropdown');
  t.equal(e.children.length, 1, 'expected to have one children');
  t.equal(e.children[0].attrs.class.trim(), 'fitbar-Dropdown-link', 'expected a children component Dropdown-link');

  t.end();
})
