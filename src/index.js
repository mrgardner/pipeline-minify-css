'use strict';

var concat = require('gulp-concat');
var handyman = require('pipeline-handyman');
var gulpIf = require('gulp-if');
var lazypipe = require('lazypipe');
var minCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');

var config = {
  addSourceMaps: true,
  concatCSS: true,
  concatFilename: handyman.getPackageName() + '.min.css',
  plugins:{
    cleanCss: {}
  }
};

module.exports = minifyCSSPipeline;

function minifyCSSPipeline(options) {

  options = options || {};
  config = handyman.mergeConf(config, options);

  var pipeline = {
    minifyCSS: minifyCSS()
  };

  return pipeline;

  function minifyCSS() {
    return lazypipe()
      .pipe(function() {
        return gulpIf(config.addSourceMaps, sourcemaps.init());
      })
      .pipe(minCSS, config.plugins.cleanCss)
      .pipe(function() {
        return gulpIf(config.concatCSS, concat(config.concatFilename));
      })
      .pipe(function() {
        return gulpIf(config.addSourceMaps, sourcemaps.write('maps'));
      });
  }
}