'use strict';
var m = require('mithril');
var mc = require('../component');
var dropdown = require('../dropdown');
var icon = require('../icon');

function linksModel() {
  var links = require('./links');

  var location = '//' + window.location.hostname;

  for (var i = 0; i < links.length; i++) {
    var l = links[i];
    if (~l.url.indexOf(location)) {
      l.current = true;
      break;
    }
  }

  return links;
}

//controller class
function controller() {
  this.linksDropdown = dropdown();

  var links = linksModel();
  var chunk = 5;
  this.linksExpanded = links.slice(0, chunk - 1);
  this.linksHidden = links.slice(chunk);
}

//view class
function view(ctrl) {

  function classModifier(classMod, cb) {
    return function(data) {
      return cb(data, classMod);
    };
  }

  function link(data, classMod) {
    var current = data.current ? 'current' : '';
    var attr = {tag: 'a', state: current, mod: classMod, href: data.url, title: data.desc};
    var children = [
      icon(data.id),
      mc('Link-title', {tag: 'span'}, data.title)
    ];

    return mc('Link',
              attr,
              children);
  }

  return mc('Bar', [
    ctrl.linksExpanded.map(classModifier('visible', link)),
    ctrl.linksDropdown.view(ctrl.linksHidden.map(classModifier('vertical', link)))
  ]);
}

module.exports = {
  controller: controller,
  view: view
};

