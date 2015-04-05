'use strict';
var mc = require('../component');
var dropdown = require('../dropdown');

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
    var child = mc('Icon', {tag: 'span', mod: data.id}, data.title);
    var attr = {tag: 'a', state: current, mod: classMod, href: data.url, title: data.desc};
    return mc('Link',
              attr,
              child);
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

