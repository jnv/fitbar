/**
 * @file
 *
 * ### Responsibilities
 * - automate common tasks using gulp
 */
'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    complexity = require('gulp-complexity'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    karma = require('gulp-karma'),
    fs = require('fs'),
    source = 'fitbar.js',
    sourceMin = 'fitbar.min.js',
    specs = 'test/spec/*.spec.js',
    karmaConf = 'test/karma.conf';
var atomify = require('atomify');

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
    .pipe(replace(/(.*)/, umdWrapper))
    .pipe(gulp.dest('.'));
});


gulp.task('test-min', ['min'], function () {
  return gulp.src([sourceMin, specs])
    .pipe(karma({
      configFile: karmaConf + '.js',
      reporters: ['dots']
    }));
});

gulp.task('default', ['lint', 'gpa', 'test', 'test-min']);

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

gulp.task('ext-chrome', function() {

});

gulp.task('server', function() {
  atomify.server(options);

});

gulp.task('dist', function() {

});

gulp.task('default', function () {
  var options = {
    server: {
      path: "index.html",
      open: true
    },
    js: {
      entry: "src/app.js",
      alias: "/bundle.js"
    },
    css : {
      entry: "src/app.css",
      alias: "/bundle.css"
    }
  };
  atomify(options, function (err, src) {
    console.log('Atomify Build Done!');
  });
  atomify.server(options);
});
