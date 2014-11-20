'use strict';
var pipe = require('functional-pipeline');
var u = require('./util');

var filterBody = function(el) {
  return el && el.nodeName === 'BODY';
};

var addedBody = pipe(u.extractValue('addedNodes'), u.filter(filterBody), u.last);

// configuration of the observer:
var mutationOptions = {childList: true};


// pass in the target node, as well as the observer options
module.exports = function(toObserve, onAddition) {
  // create an observer instance
  var observer = new MutationObserver(function(mutations) {
    var lastAdded = u.last(mutations.map(addedBody));
    if(lastAdded) {
      onAddition(lastAdded);
    }
  });

  observer.observe(toObserve, mutationOptions);
};
