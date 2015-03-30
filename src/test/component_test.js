var test = require('tape');
var _ = require('lodash');
var mc = require('../component');

function classNames(element) {
  return element.attrs.class.split(/\s+/);
}

function hasClass(element, klass) {
  var classes = classNames(element);
  return _.includes(classes, klass);
}

test('creates virtual element with classes', function(t) {
  var e = mc('Dropdown', {state: 'open', class: 'original-class another', click: function(){} });
  var classes = classNames(e);

  t.equal(e.tag, 'div', 'expected to be div by default');

  var expectedClasses = ['fitbar-Dropdown', 'is-open', 'original-class', 'another'];

  var diff = _.difference(classes, expectedClasses);
  t.deepEqual(classes, expectedClasses, 'expected classes to be equivalent');

  t.false(e.attrs.state, 'state attr should be unset');

  t.end();
});

test('sets tag name', function(t) {
  var e = mc('Link', {tag: 'span'});
  t.equal(e.tag, 'span', 'expected to be a span');
  t.false(e.attrs.tag, 'tag attr should be unset');
  t.end();
});

test('sets a modifier', function(t) {
  var e = mc('Link', {mod: 'current'});
  t.assert(hasClass(e, 'fitbar-Link'), 'should have the component class');
  t.assert(hasClass(e, 'fitbar-Link--current'), 'should have a modifier class');
  t.false(e.attrs.mod, 'mod attr should be unset');
  t.end();
});

test('allows children as a second argument', function(t) {
  var e = mc('Dropdown', [mc('Dropdown-link')]);

  t.assert(hasClass(e, 'fitbar-Dropdown'));
  t.equal(e.children.length, 1, 'expected to have one children');
  t.assert(hasClass(e.children[0], 'fitbar-Dropdown-link'), 'expected a children component Dropdown-link');

  t.end();
});
