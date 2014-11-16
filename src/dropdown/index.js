'use strict';
var m = require('mithril');

function dropdown(options) {

  options = options || {
    renderCloseHanlder: true,
    toggleText: 'Více'
  };

  var isOpen = m.prop(false);

  var contentWrapper = 'div.fitbar-Dropdown-contents';
  var targetSig = 'span.fitbar-Link';


  function close(e) {
    isOpen(false);
  }
  function toggle(e) {
    isOpen(!isOpen());
  }

  function openClass() {
    return isOpen() ? ' is-open' : ' is-closed';
  }

  function closeOverlay() {
    if (isOpen()) {
      return m('div.fitbar-Dropdown-overlay', {onclick: close});
    }
  }

  function view(contents) {
    return m('.fitbar-Dropdown', [
        m('.fitbar-Dropdown-wrapper', [
          m(targetSig, {onclick: toggle}, options.toggleText),
          m(contentWrapper, {class: openClass()}, contents)
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
