'use strict';
var m = require('mithril');

function linksModel() {
  var links = require('./links');

  var location = '//' + window.location.hostname;

  for (var i = 0; i < links.length; i++) {
    var l = links[i];
    if(~l.url.indexOf(location)) {
      l.current = true;
      break;
    }
  }

  return links;
}



//controller class
function controller() {
  this.links = linksModel();
}

//view class
function view(ctrl) {
  var chunk = 5;


  function classModifier(classMod, cb) {
    return function(data) {
      return cb(data, classMod);
    };
  }

  function link(data, classMod) {
    var baseClass = '.fitbar-Link';
    var current = data.current ? '.is-current' : '';
    var mod = classMod ? baseClass + '--' + classMod : '';
    return m('a' + baseClass + mod + current, {href: data.url, title: data.desc}, data.title);
  }

  var linksVisible = ctrl.links.slice(0, chunk - 1);
  var linksDropdown = ctrl.links.slice(chunk);

  return m('.fitbar-Bar', [
    linksVisible.map(classModifier('visible', link)),
    m('div.fitbar-Dropdown', [
      m('span.fitbar-Link', 'Více'),
      m('.fitbar-Dropdown-contents', [
        linksDropdown.map(classModifier('vertical', link))
      ])
    ]),
  ]);
}

module.exports = {
  controller: controller,
  view: view
};

