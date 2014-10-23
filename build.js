// build.js
var atomify = require('atomify');
var config;


config = {
  js: {
    entry: 'src/index.js',
    alias: '/bundle.js'
  },
  css: {
    entry: 'src/index.css',
    alias: '/bundle.css'
  },
  server: {
    path: 'index.html',
  }
};

atomify(config);
