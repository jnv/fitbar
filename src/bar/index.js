'use strict';
var m = require('mithril');

function linksModel() {
  var links = require('./links');

  var location = window.location.hostname;

  for (var i = links.length - 1; i >= 0; i--) {
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
  function link(data) {
    var current = data.current ? '.is-current' : '';
    return m('a.fitbar-Link' + current, {href: data.url, title: data.desc}, data.title);
  }

  return m('.fitbar-Bar', [
    ctrl.links.map(function(ldata){
      return link(ldata);
    })
  ]);
}

module.exports = {
  controller: controller,
  view: view
};

