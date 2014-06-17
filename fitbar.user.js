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

  var CONTENTS = "<style>\n  @font-face {\n  font-family: 'FontAwesome';\n  src: url(\"//netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.eot?v=4.1.0\");\n  src: url(\"//netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.eot?#iefix&v=4.1.0\") format(\"embedded-opentype\"), url(\"//netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.woff?v=4.1.0\") format(\"woff\"), url(\"//netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.ttf?v=4.1.0\") format(\"truetype\"), url(\"//netdna.bootstrapcdn.com/font-awesome/4.1.0/fonts/fontawesome-webfont.svg?v=4.1.0#fontawesomeregular\") format(\"svg\");\n  font-weight: normal;\n  font-style: normal;\n  }\n</style>\n<style scoped>\n@import url('//jnv.github.io/fitbar/styles/main.css');\n</style>\n<nav class=\"navbar navbar-inverse fitbar\" role=\"navigation\">\n  <div class=\"\">\n  <ul class=\"nav navbar-nav\">\n    <li>\n      <a class=\"ico ico-fit\" href=\"https://fit.cvut.cz/\" title=\"Domovská stránka FIT\">FIT</a>\n    </li>\n    <li>\n      <a class=\"ico ico-kos\" href=\"https://kos.is.cvut.cz/\" title=\"Komponenta studium\">KOS</a>\n    </li>\n    <li>\n      <a class=\"ico ico-edux\" href=\"https://edux.fit.cvut.cz/\">Edux</a>\n    </li>\n    <li>\n      <a class=\"ico ico-ssp\" href=\"https://is.fit.cvut.cz/group/ssp\" title=\"Spolupráce s průmyslem\">SSP</a>\n    </li>\n    <!-- Dropdown -->\n    <li class=\"dropdown\">\n      <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Více</a>\n      <ul class=\"dropdown-menu\">\n        <li>\n        <a class=\"ico ico-imap\" href=\"https://imap.fit.cvut.cz/\" title=\"SquirellMail\">IMAP</a>\n        </li>\n        <li>\n          <a class=\"ico ico-progtest\" href=\"https://progtest.fit.cvut.cz/\" title=\"Progtest\">Progtest</a>\n        </li>\n        <li>\n          <a class=\"ico ico-timetable\" href=\"https://timetable.fit.cvut.cz/\" title=\"Rozvrhy\">Timetable</a>\n        </li>\n        <li>\n          <a class=\"ico ico-gitlab\" href=\"https://gitlab.fit.cvut.cz/\" title=\"Správa kódu v Gitu\">GitLab</a>\n        </li>\n        <li>\n          <a  class=\"ico ico-forum\" href=\"https://forum.fit.cvut.cz/\" title=\"Diskusní fórum Fakulty informačních technologií ČVUT\">Forum</a>\n        </li>\n        <li>\n          <a class=\"ico ico-project\" href=\"https://project.fit.cvut.cz/\" title=\"Systém Swinpro pro správu projektů\">Project FIT</a>\n        </li>\n        <li>\n          <a class=\"ico ico-teambox\" href=\"https://teambox.fit.cvut.cz/\" title=\"\">Teambox</a>\n        </li>\n        <li>\n          <a class=\"ico ico-bpm\" href=\"https://bpm.cvut.cz\" title=\"Portál BPM\">Závěrečné práce</a>\n        </li>\n        <!-- <li class=\"ico ico-\">\n          <a role=\"menuitem\" href=\"\" title=\"\"></a>\n        </li> -->\n        <li>\n          <a class=\"ico ico-usermap\" href=\"http://usermap.cvut.cz\" title=\"Databáze uživatelů ČVUT\">Usermap</a>\n        </li>\n      </ul>\n    </li>\n  </ul>\n  <ul class=\"nav navbar-nav navbar-right\">\n\n    <!-- notifications menu -->\n    <li class=\"notifications-dropdown dropdown\">\n      <a href=\"#\" class=\"notifications-indicator notifications-toggle\" data-toggle=\"dropdown\">0</a>\n      <ul class=\"dropdown-menu notifications-menu\">\n        <li>\n          <a href=\"#\" class=\"notification-item active\">\n            <img src=\"//jnv.github.io/fitbar/images/avatar-default.jpg\" class=\"notif-actor-avatar\">\n            <p class=\"notif-body\">\n              <strong class=\"notif-actor\">T. Marný</strong>\n              <span class=\"notif-verb\">Nový komentář k</span>\n              <strong class=\"notif-object\">Upgrade fóra na SMF 2.0</strong>\n            </p>\n            <small class=\"notif-meta\">\n            <span class=\"ico ico-forum\">Fórum</span>\n            <time class=\"notif-time\">Před 10 minutami</time>\n            </small>\n          </a>\n        </li>\n        <li>\n          <a href=\"#\" class=\"notification-item\">\n            <img src=\"//jnv.github.io/fitbar/images/avatar-default.jpg\" class=\"notif-actor-avatar\">\n            <p class=\"notif-body\">\n              <strong class=\"notif-actor\">J. Jirůtka</strong>\n              <span class=\"notif-verb\">Nahlášena nová chyba:</span>\n              <strong class=\"notif-object\">is/fitbar#42 Oprava ikonek</strong>\n            </p>\n            <small class=\"notif-meta\">\n            <span class=\"ico ico-gitlab\">GitLab</span>\n            <time class=\"notif-time\">Před 45 minutami</time>\n            </small>\n          </a>\n        </li><li>\n          <a href=\"#\" class=\"notification-item\">\n            <img src=\"//jnv.github.io/fitbar/images/avatar-default.jpg\" class=\"notif-actor-avatar\">\n            <p class=\"notif-body\">\n              <strong class=\"notif-actor\">T. Bartoň</strong>\n              <span class=\"notif-verb\">Nové hodnocení u</span>\n              <strong class=\"notif-object\">MI-RUB</strong>\n            </p>\n            <small class=\"notif-meta\">\n            <span class=\"ico ico-edux\">Edux</span>\n            <time class=\"notif-time\">Před 1 hodinou</time>\n            </small>\n          </a>\n        </li>\n        <li>\n          <a href=\"#\" class=\"notif-older\">Starší notifikace…</a>\n        </li>\n      </ul>\n    </li>\n    <!-- Login / Logout button -->\n    <li class=\"js-logged-out\">\n      <a href=\"/c/portal/login?p_l_id=66683\" title=\"Přihlásit\" class=\"ico ico-login\" role=\"menuitem\" data-login>Přihlásit</a>\n    </li>\n    <!-- User info & quick links -->\n    <li class=\"userbar-dropdown js-logged-in\">\n      <a href=\"#\" title=\"Show user profile\" class=\"userbar-toggle\" data-toggle=\"dropdown\">\n        <img src=\"//jnv.github.io/fitbar/images/avatar-default.jpg\" class=\"userbar-avatar-thumb\">\n      </a>\n      <ul class=\"dropdown-menu userbar-menu\" role=\"menu\">\n        <li class=\"userbar-container\">\n          <div class=\"userinfo\">\n          <span class=\"name\">Frantisek Omacka</span>\n          <span class=\"role\">Sponzor, Teacher</span>\n          </div>\n          <div class=\"userbar-utils\">\n            <a href=\"#\" class=\"userbar-settings ico ico-settings\" title=\"Nastavení\"></a>\n            <a href=\"#\" class=\"userbar-logout ico ico-logout\" data-logout>Odhlásit</a>\n          </div>\n        </li>\n      </ul>\n    </li>\n  </ul>\n  </div>\n</nav>\n\n<!--\n<script src=\"scripts/vendor.js\"></script>\n-->\n<script src=\"//jnv.github.io/fitbar/scripts/vendor.js\"></script>\n<script src=\"//jnv.github.io/fitbar/scripts/demo.js\"></script>\n";

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
