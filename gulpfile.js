/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using gulp
 */
'use strict';

var gulp = require('gulp');
var source = 'fitbar.js',
    sourceMin = 'fitbar.min.js',
    specs = 'test/spec/*.spec.js',
    karmaConf = 'test/karma.conf';
var $ = require('gulp-load-plugins')();
var atomify = require('atomify');
var merge = require('merge');
/*
gulp.task('lint', function () {
  return gulp.src([source, specs])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('gpa', function () {
  return gulp.src([source, specs])
    .pipe(complexity({
      cyclomatic: [8],
      halstead: [9],
      maintainability: [100]
    }));
});

gulp.task('test', function () {
  return gulp.src([source, specs])
    .pipe(karma({
      configFile: karmaConf + '.js'
    }));
});

gulp.task('min', function () {
  return gulp.src(source)
    .pipe(rename(sourceMin))
    .pipe(uglify({
      outSourceMap: true
    }))
    .pipe(gulp.dest('.'));
});


gulp.task('test-min', ['min'], function () {
  return gulp.src([sourceMin, specs])
    .pipe(karma({
      configFile: karmaConf + '.js',
      reporters: ['dots']
    }));
});
*/
// gulp.task('default', ['lint', 'gpa', 'test', 'test-min']);

var jsConfig = {
  entry: 'src/index.js',
  alias: '/bundle.js',
};

var cssConfig = {
  entry: 'src/index.css',
  alias: '/bundle.css',
  plugins: [
    ['wrap-selectors'],
    ['rework-inherit']
  ]
};

var serverConfig = {
  sync: true
};

function atomifyConfig(modifier) {
  var options = {js: jsConfig, css: cssConfig};
  modifier = modifier || {};
  return merge(options, modifier);
}

function atomifyBuild(optsMod, callback) {
  var options = atomifyConfig(optsMod);
  var cbCount = 0,
      cbExpected = 2;

  atomify(options, function (err) {
    cbCount++;

    if (!!err) {
      return callback(err);
    }
    if(cbCount === cbExpected) {
      callback();
    }
  });
}

gulp.task('ext-chrome', function(cb) {
  atomifyBuild({output: 'ext/chrome/src/inject'}, cb);
});

gulp.task('server', function() {
  atomify.server(atomifyConfig({server: serverConfig}));
});

gulp.task('dist', function(cb) {
  atomifyBuild({output: 'dist/fitbar'}, cb);
});
