'use strict';
var m = require('mithril');

function dropdown(options) {

  var isOpen = m.prop(false);

  var wrapper = 'div.fitbar-Dropdown';
  var contentWrapper = 'div.fitbar-Dropdown-contents';
  var targetSig = 'span.fitbar-Link';

  function close() {
    isOpen(false);
  }
  function toggle() {
    isOpen(!isOpen());
  }

  function openClass() {
    return isOpen() ? ' is-open' : ' is-closed';
  }


  function view(contents) {
    return m(wrapper, [
      m(targetSig, {onclick: toggle}, 'Více'),
      m(contentWrapper, {class: openClass()}, contents)
    ]);
  }

  return {
    toggle: toggle,
    view: view
  };
}

module.exports = dropdown;
