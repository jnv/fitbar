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


  // evaluate all inserted scripts
  // REMEMBER: this is prototype only!
  //   if you're reading this in production, something went very, very wrong!

  var scripts = bar.getElementsByTagName('script');
  var inline = [], srcs = [];


  for (var n = 0; n < scripts.length; n++) {
    var script = scripts[n];
    if(script.src === '') {
      inline.push(script.innerHTML);
    }
    else {
      srcs.push(script.src);
    }
  }

  var srcIter = function(sources) {
    var srcs = sources.slice(0);
    return function() {
      return srcs.shift();
    };
  };
  var nextSrc = srcIter(srcs);
  /*
  var evalScripts = function(contents) {
    contents.forEach(function(content){
      var el = document.createElement('script');
      el.text = content;
      el.type = 'text/javascript';
      document.body.appendChild(el);
    });
  };*/

  var loadScript = function(src) {
    if(!src) {
      // evalScripts(inline);
      return;
    }
    console.log('loading', src);
    var el = document.createElement('script');
    el.type = 'text/javascript';
    el.onload = function() { loadScript(nextSrc()); };
    el.src = src;
    document.body.appendChild(el);
  };
  loadScript(nextSrc());
  // end eval
})(document);
