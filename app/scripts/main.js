(function(document){
  var WRAPPER_ID = 'fitbar';
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

  var generateNav = function(linksList) {
    var anchors = linksList.map(function(link){
      return '<a href="'+link.url+'">'+link.title+'</a>';
    })

    var nav = document.createElement('nav');
    nav.innerHTML = anchors.join('');
    nav.className = 'links';
    return nav;
  }

  var generateBar = function() {
    var bar = document.createElement('div');

    bar.id = WRAPPER_ID;
    bar.appendChild(generateNav(LINKS));

    return bar;
  }

  document.body.appendChild(generateBar());


})(document);
