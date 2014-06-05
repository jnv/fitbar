(function(document){
  'use strict';

  var CONTENTS = <%= contents %>;

  var getElementExpander = function(el) {
    var styles = window.getComputedStyle(el);

    return {
      top: styles.paddingTop,
      left: styles.paddingLeft,
      right: styles.paddingRight
    };
  };

  var setBarPosition = function(bar, dimensions) {
    bar.style.marginTop = '-' + dimensions.top;
    bar.style.marginLeft = '-' +  dimensions.left;
    bar.style.paddingRight = 'calc(' + dimensions.right + ' * 2)';
  };

  var generateStylesheetLink = function(url) {
    var link = document.createElement('link');

    link.rel = 'stylesheet';
    link.href = url;
    return link;
  };


  var bar = document.createElement('div');
  bar.id = 'fitbar';
  bar.innerHTML = CONTENTS;
  setBarPosition(bar, getElementExpander(document.body));
  document.body.insertBefore(bar, document.body.firstElementChild);
  // document.head.appendChild(generateStylesheetLink('/* @echo BASE_URL *//main.css'));

})(document);
