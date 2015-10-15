/*global require */
'use strict';

var minifyPipeline = require('../');
var gulp = require('gulp');
var path = require('path');
var assert = require('stream-assert');
var should = require('chai').should();

var fixtures = function (glob) { return path.join(__dirname, 'fixtures', glob); };

describe('pipeline-minify-css', function() {

  var testPath = path.join(__dirname, 'dist');


  describe('Default Pipeline', function() {
    it('Should output two files after concatenation. Minified file and sourcemap', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline().minifyCSS())
        .pipe(assert.length(2))
        .pipe(assert.last(function (d) {
          d.relative.toString().should.eql('build.min.css');
        }))
        .pipe(assert.end(done));
    });
  });

  describe('User specific configurations', function() {
    it('Should generate only the minified file', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline({addSourceMaps: false, concatCSS: true}).minifyCSS())
        .pipe(assert.length(1))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline({addSourceMaps: false, concatCSS: false}).minifyCSS())
        .pipe(assert.length(2))
        .pipe(assert.end(done));
    });

    it('Should output the same number of files minified and the map for each one', function (done) {
      gulp
        .src(fixtures('*'))
        .pipe(minifyPipeline({addSourceMaps: true, concatCSS: false}).minifyCSS())
        .pipe(assert.length(4))
        .pipe(assert.end(done));
    });
  });

});
