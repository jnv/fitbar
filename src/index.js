var m = require('mithril');
var bar = require('./bar');

var root = document.createElement('div');
m.module(root, bar);

document.addEventListener('DOMContentLoaded', function inject() {
  document.body.insertBefore(root, document.body.firstElementChild);
});
