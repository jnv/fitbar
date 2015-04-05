'use strict';
var m = require('mithril');
var mc = require('../component');

function dropdown(options) {

  options = options || {
    renderCloseHandler: true,
    toggleText: 'Více'
  };

  var isOpen = m.prop(false);

  function close() {
    isOpen(false);
  }
  function toggle() {
    isOpen(!isOpen());
  }

  function openState() {
    return isOpen() ? 'open' : 'closed';
  }

  function closeOverlay() {
    if (isOpen()) {
      return mc('Dropdown-overlay', {onclick: close});
    }
  }

  function view(contents) {
    return m('.fitbar-Dropdown', [
        mc('Dropdown-wrapper', [
          mc('Link', {tag: 'span', onclick: toggle}, options.toggleText),
          mc('Dropdown-contents', {state: openState()}, contents)
        ]),
        closeOverlay()
      ]);
  }

  return {
    toggle: toggle,
    view: view,
    closeOverlay: closeOverlay
  };
}

module.exports = dropdown;
