'use strict';

var DEV_DIR = 'dist/dev/',
    PROD_DIR = 'dist/prod/',

    path = require('path'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    minifyHTML = require('gulp-minify-html'),
    sourcemaps = require('gulp-sourcemaps'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    livereload = require('gulp-livereload'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    assign = require('lodash.assign'),
    svgstore = require('gulp-svgstore'),
    svgmin = require('gulp-svgmin'),
    inject = require('gulp-inject'),

    libraries = [
      'lodash',
      'mithril',
      'velocity-animate'
    ];

gulp.task('dev-libs', function() {

  var b = browserify({debug: false});

  libraries.forEach(function(lib) {
    b.require(lib);
  });

  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('libs.js'))
    .pipe(buffer())
    .pipe(gulp.dest(DEV_DIR));
});

gulp.task('dev', function() {

  // Browserify config
  var browserifyConfig = {
        debug: false,
        entries: './src/js/app',
        transform: [babelify]
      },
      browserifyOptions = assign({}, watchify.args, browserifyConfig),
      b = watchify(browserify(browserifyOptions));

  libraries.forEach(function(lib) {
    b.external(lib);
  });
  b.on('update', compileJS);
  b.on('log', gutil.log);

  function compileJS() {
    return b.bundle()
      .on('error', gutil.log.bind(gutil, 'Browserify error'))
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(gulp.dest(DEV_DIR))
      .pipe(livereload());
  }

  /**
   * Compile all that SASS.
   */
  function compileSASS() {
    gulp
      .src('src/scss/main.scss')
      .pipe(sass())
      .pipe(gulp.dest(DEV_DIR))
      .pipe(livereload());
  }

  //Watch for SCSS changes and reload.
  gulp.watch('src/scss/*.scss', compileSASS);

  // Boot the livereload server.
  livereload.listen();

  // Execute an initial compile.
  compileJS();
  compileSASS();
});

gulp.task('prod-libs', function() {

  var b = browserify({debug: false});

  libraries.forEach(function(lib) {
    b.require(lib);
  });

  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('libs.min.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(PROD_DIR));
});

gulp.task('prod', function() {

  var b = browserify({
    debug: true,
    entries: './src/js/app',
    transform: [babelify]
  });

  libraries.forEach(function(lib) {
    b.external(lib);
  });

  b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify error'))
    .pipe(source('main.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(PROD_DIR));

  gulp
    .src('src/scss/main.scss')
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest(PROD_DIR))

  gulp
    .src('src/html/index.prod.html')
    .pipe(rename('index.html'))
    .pipe(minifyHTML())
    .pipe(gulp.dest(PROD_DIR));
});

/**
 * Smashes all our SVG assets together into one minified symbol sheet.
 */
gulp.task('svg', function() {
  var svgs = gulp
    .src('src/img/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('src/html/index.dev.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest(DEV_DIR));
  /*
  return gulp
    .src('src/img/*.svg')
    .pipe(svgmin(function(file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest(DEV_DIR));
  */
});

/**
 * Configure the default task to compile all the things for dev.
 */
gulp.task('default', ['dev-libs', 'dev', 'svg']);

/**
 * Compile everything magically for prod.
 */
gulp.task('production', ['prod-libs', 'prod', 'svg']);

/**
 * var gulp = require('gulp');
var svgstore = require('gulp-svgstore');
var inject = require('gulp-inject');

gulp.task('svgstore', function () {
    var svgs = gulp
        .src('test/src/*.svg')
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents (filePath, file) {
        return file.contents.toString();
    }

    return gulp
        .src('test/src/inline-svg.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(gulp.dest('test/dest'));
});
 */
