/*global require, module */

'use strict';

var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});

var config = {
  addSourceMaps: true,
  concatCSS: true
};

module.exports = minifyCSSPipeline;

function minifyCSSPipeline() {

  var pipeline = {
    minifyCSS: minifyCSS()
  };

  return pipeline;

  function minifyCSS() {
    return lazypipe()
    .pipe(function() {
      return plugins.if(config.addSourceMaps, plugins.sourcemaps.init());
    })
    .pipe(plugins.minifyCss)
    .pipe(function() {
      return plugins.if(config.concatCSS, plugins.concat('build.min.css'));
    })
    .pipe(function() {
      return plugins.if(config.addSourceMaps, plugins.sourcemaps.write('maps'));
    });
  }
}
