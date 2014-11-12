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

  function link(data) {
    var current = data.current ? '.is-current' : '';
    return m('a.fitbar-Link' + current, {href: data.url, title: data.desc}, data.title);
  }

  var linksVisible = ctrl.links.slice(0, chunk - 1);
  var linksDropdown = ctrl.links.slice(chunk);

  return m('.fitbar-Bar', [
    linksVisible.map(link),
    m('.fitbar-Dropdown', [
      linksDropdown.map(link)
    ])
  ]);
}

module.exports = {
  controller: controller,
  view: view
};

