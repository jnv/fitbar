'use strict';
function Fitbar(){
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
