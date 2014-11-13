'use strict';
var m = require('mithril');

function dropdown(props, contents) {

  var isOpen = m.prop(false);

  var wrapper = 'div.fitbar-Dropdown';
  var contentWrapper = 'div.fitbar-Dropdown-contents';
  var targetSig = 'span.fitbar-Link';

  function close() {
    isOpen(false);
  }
  function toggler(cb) {
    return function() {
      console.log(cb());
      cb(!cb());
    };
  }
  function openClass() {
    return isOpen() ? ' is-open' : ' is-closed';
  }

  var vm = {
    isOpen: m.prop(false)
  };

  function view(vm) {
    return m(wrapper, [
      m(targetSig, {onclick: toggler(vm.isOpen)}, 'Více'),
      m(contentWrapper, {class: openClass()}, contents)
    ]);
  }

  return view(vm);
}

module.exports = dropdown;
