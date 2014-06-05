'use strict';

var gulp = require('gulp');
// var open = require('open');
var wiredep = require('wiredep').stream;
var map = require('vinyl-map');
var config = require('./config.json');
var args   = require('yargs').argv;
var lazypipe = require('lazypipe');
// var gutil = require('gulp-util');

// Load plugins
var $ = require('gulp-load-plugins')();

var isDist = args.type === 'dist';

var envConfig = function() {
  if(isDist) {
    return config.dist;
  }
  return config.dev;
};

var handleError = function(err) {
  console.log(err.toString());
  this.emit('end');
};

var preprocess = function() {
  return $.preprocess({context: envConfig()});
};

// Styles
gulp.task('styles', function () {
  /*return gulp.src('app/styles/main.scss')
    .pipe($.rubySass({
      style: 'expanded',
      loadPath: ['app/bower_components', 'app/styles/vendors']
    }))
    .on('error', handleError)
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('dist/'))
    .pipe($.size());*/
  return gulp.src('app/styles/main.scss')
    .pipe($.compass({
      project: '.',
      sass: 'app/styles',
      css: 'dist/styles',
      image: 'app/images',
      import_path: ['app/styles/vendors', 'app/bower_components'],
      sourcemap: !isDist,
      comments: !isDist,
      style: isDist ? 'compressed' : 'expanded',
    }).on('error', handleError)
    );
    // .pipe(gulp.dest('dist/styles'));
});

// Scripts
gulp.task('scripts', function () {
  // var browserify = require('browserify');
  // var source = require('vinyl-source-stream');
  // return gulp.src('app/scripts/**/*.js')
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('default'))
    /*
  return browserify({
      entries: './app/scripts/main.js'
    }).bundle({debug: envConfig().DEBUG})
    .on('error',$.util.log)
    .pipe(source('main.js'))
    .pipe($.buffer())
    .pipe(preprocess())
    // .pipe($.stream())
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
    */

  return gulp.src('app/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe($.size());
});

// Primary userscript
// Takes generated template and puts it into a userscript
gulp.task('userscript', ['html'], function () {
  var stringify = map(function (code) {
    code = code.toString();
    return JSON.stringify(code);
  });

  return gulp.src('dist/fitbar.html')
    // .pipe(preprocess())
    .pipe(stringify)
    .pipe($.wrap({ src: 'app/fitbar.user.js'}))
    .pipe($.concat('fitbar.user.js'))
    .pipe(gulp.dest('dist'));
});

// HTML
gulp.task('html', ['styles', 'scripts'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  var useref = lazypipe()
    .pipe($.useref.assets)
    .pipe(function(){ return jsFilter;} )
    .pipe($.uglify)
    .pipe(jsFilter.restore)
    .pipe(function(){ return cssFilter;})
    .pipe($.csso)
    .pipe(cssFilter.restore)
    .pipe($.useref.restore)
    .pipe($.useref);

  return gulp.src('app/*.html')
    .pipe(preprocess())
    .pipe($.if(isDist, useref()))
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});


// Images
gulp.task('images', function () {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
    .pipe($.size());
});

// Fonts
gulp.task('fonts', function () {
  return $.bowerFiles()
    .pipe($.filter([
    '**/*.eot',
    '**/*.svg',
    '**/*.ttf',
    '**/*.woff'
  ]))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/fonts'))
    .pipe($.size());
});

// Clean
gulp.task('clean', function () {
  return gulp.src(['dist/styles', 'dist/scripts', 'dist/images', 'dist/fonts'], {
    read: false
  }).pipe($.clean());
});

// Build
gulp.task('build', ['html', 'images', 'fonts']);

// Default task
gulp.task('default', ['watch']);

gulp.task('buildc', ['clean'], function () {
  return gulp.start('build');
});

// Connect
gulp.task('connect', function () {
  $.connect.server({
    root: ['dist', 'app'],
    port: 9000,
    livereload: true
  });
});

// Open
gulp.task('serve', ['connect', 'html', 'userscript'], function () {
  //open('http://localhost:9000');
});

// Inject Bower components
gulp.task('wiredep', function () {
  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/bower_components/'
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      directory: 'app/bower_components',
      ignorePath: 'app/'
    }))
    .pipe(gulp.dest('app'));
});

// Watch
gulp.task('watch', ['connect', 'serve'], function () {

  // Watch for changes in `app` folder
  gulp.watch([
      'app/*.html',
      'dist/**/*.css',
      'app/scripts/**/*.js',
      'app/images/**/*'
    ], function (event) {

      return gulp.src(event.path)
      .pipe($.connect.reload());
    });

  // Watch .scss files
  gulp.watch('app/styles/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('app/scripts/**/*.js', ['scripts']);

  // Watch image files
  gulp.watch('app/images/**/*', ['images']);

  // Watch bower files
  gulp.watch('bower.json', ['wiredep']);

  gulp.watch(['app/*.user.js', 'app/fitbar.html'], ['userscript']);
});

gulp.task('setDist', function (){
  isDist = true;
});

// Deploy to gh-pages
gulp.task('deploy', ['setDist', 'build'], function () {
  gulp.src('dist/**/*')
    .pipe($.ghPages({
      remoteUrl: 'git@github.com:jnv/fitbar.git',
      cacheDir: '.cache',
      push: true
    }
  ));
});
