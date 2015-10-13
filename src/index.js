/*global require, module */

'use strict';

var lazypipe = require('lazypipe');
var plugins = require('gulp-load-plugins')({lazy: true});
var handyman = require('pipeline-handyman');

var config = {
  addSourceMaps: true,
  concatCSS: true,
  plugins:{
    cleanCss: {}
  }
};

module.exports = minifyCSSPipeline;

function minifyCSSPipeline(options) {

  if (config) {
    config = handyman.updateConf(config, options);
  }

  var pipeline = {
    minifyCSS: minifyCSS()
  };

  return pipeline;

  function minifyCSS() {
    return lazypipe()
    .pipe(function() {
      return plugins.if(config.addSourceMaps, plugins.sourcemaps.init());
    })
    .pipe(plugins.minifyCss, config.plugins.cleanCss)
    .pipe(function() {
      return plugins.if(config.concatCSS, plugins.concat('build.min.css'));
    })
    .pipe(function() {
      return plugins.if(config.addSourceMaps, plugins.sourcemaps.write('maps'));
    });
  }
}
