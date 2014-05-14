(function(document){
  'use strict';
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

  var Fitbar = (function(){
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

  }());



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

  var bar = Fitbar.setLinks(LINKS).toDom();
  document.body.insertBefore(bar, document.body.firstElementChild);
  document.head.appendChild(generateStylesheetLink('/* @echo BASE_URL *//main.css'));
  setBarPosition(bar, getElementExpander(document.body));

})(document);
