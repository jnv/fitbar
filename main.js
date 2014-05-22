(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var Fitbar = function() {
    var wrapperId = 'fitbar',
        linksList,
        container;

    var setLinks = function(links) {
      linksList = links;
      return this;
    };

    var getContainer = function() {
      if(!container) {
        container = document.createElement('div');
        container.id = wrapperId;
      }
      return container;
    };

    var generateNav = function(linksList) {
      var anchors = linksList.map(function(link){
        return '<a href="'+link.url+'">'+link.title+'</a>';
      });

      var nav = document.createElement('nav');
      nav.innerHTML = anchors.join('');
      nav.className = 'links';
      return nav;
    };

    var toDom = function() {
      var bar = getContainer();
      bar.appendChild(generateNav(linksList));

      return bar;
    };

    return {
      getContainer: getContainer,
      setLinks: setLinks,
      toDom: toDom
    };

};


module.exports = Fitbar;

},{}],2:[function(require,module,exports){
(function(document){
  'use strict';
  var fitbar = require('./fitbar');
  var LINKS = [
    {
      title: 'FIT',
      url: 'https://fit.cvut.cz/'
    },
    {
      title: 'KOS',
      url: 'https://kos.is.cvut.cz/'
    },
    {
      title: 'Edux',
      url: 'https://edux.fit.cvut.cz/'
    },
    {
      title: 'Timetable',
      url: 'https://timetable.fit.cvut.cz/'
    },
    {
      title: 'GitLab',
      url: 'https://gitlab.fit.cvut.cz/'
    }
  ];

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

  var bar = fitbar().setLinks(LINKS).toDom();
  document.body.insertBefore(bar, document.body.firstElementChild);
  document.head.appendChild(generateStylesheetLink('https//jnv.github.io/fitbar/main.css'));
  setBarPosition(bar, getElementExpander(document.body));

})(document);

},{"./fitbar":1}]},{},[2])