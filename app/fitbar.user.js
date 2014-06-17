// ==UserScript==
// @name        Fitbar
// @namespace   http://jnv.github.io/fitbar/
// @description Injects global navigation bar
// @version     2015.6.5
// @author      jnv
// @homepage    http://jnv.github.io/fitbar/
// @include     http*://*.cvut.cz/*
// @exclude     http*://idp.fit.cvut.cz/*
// @updateURL   https://jnv.github.io/fitbar/fitbar.user.js
// @run-at window-load
// @id fitbar-jnv
// ==/UserScript==

(function(document){
  'use strict';

  var CONTENTS = <%= contents %>;

  var getElementExpander = function(el, box) {
    var styles = window.getComputedStyle(el);
    if(!box) {
      box = 'padding';
    }
    return {
      top: styles[box + 'Top'],
      left: styles[box + 'Left'],
      right: styles[box + 'Right']
    };
  };

  var setBarPosition = function(bar, dimensions) {
    bar.style.marginTop = 'calc(0px - ' + dimensions.top.join(' - ') + ')';
    bar.style.marginLeft = 'calc(0px - ' + dimensions.left.join(' - ') + ')';
    bar.style.paddingRight = 'calc(2 * ' + dimensions.right.join(' + ') + ' * 2)';
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

  var bodyPadding = getElementExpander(document.body, 'padding'),
      bodyMargin = getElementExpander(document.body, 'margin');
  var calcBodyBox = {};
  for(var prop in bodyPadding) {
    if(bodyPadding.hasOwnProperty(prop) && bodyMargin.hasOwnProperty(prop)){
      calcBodyBox[prop] = [bodyPadding[prop], bodyMargin[prop]];
    }
  }
  setBarPosition(bar.querySelector('.fitbar'), calcBodyBox);
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
