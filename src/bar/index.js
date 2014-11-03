'use strict';
var m = require('mithril');
var links = require('./links');

//controller class
function controller() {
  this.links = links;
}

//view class
function view(ctrl) {
  function link(data) {
    return m('a.fitbar-Link', {href: data.url, title: data.desc}, data.title);
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

