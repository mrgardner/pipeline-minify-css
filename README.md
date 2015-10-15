# Pipeline-minify-css


## Information

| Package       | Description   | Version|
| ------------- |:-------------:| -----:|
| pipeline-minify-css| This pipeline minifies and optionally concatenates css files | 0.1.0 |

# Overview


_repo_: `https://github.com/kenzanmedia/pipeline-minify-css/`

_jenkins_: `TODO`

## Install
`npm install git+ssh:git@github.com:kenzanmedia/pipeline-minify-css.git`

## Usage
```javascript
var gulp = require('gulp');
var minifyPipeline = require('pipeline-minify-css')();


gulp.task('default', function() {
  return gulp
    .src(['src/**/*.css'])
    .pipe(minifyPipeline.minifyCSS());
});
```

## Options

Pipeline options:
* _config_ -> Object that contains the configuration.

    1. __addSourceMaps:__ If set to __false__ source maps won't be generated for the compile files. By default the pipeline will generate the source maps and store them in _maps_.

    2. __concatCSS:__ If set to __false__ the pipeline won't concatenate the files to generate a single CSS file.

    3. __plugins:__ Gathers all of the specific configurations for the tasks used in the pipeline.

      + __plugins.cleanCss:__ Minifies CSS files using the basic [clean-css](https://github.com/jakubpawlowicz/clean-css#what-is-clean-css) configuration. You can provide your own minification rules setting an object-- following [this](https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api) rules.


  Default:
  ```javascript
  config = {
    addSourceMaps: true,
    concatCSS: true,
    plugins:{
      cleanCss: {}
    }
  }
  ```  

## Results

This pipeline returns an object. This object receives a stream with the files to minify, and you can call the _minifyCSS_ method to execute the minification. Based on the configuration provided in _config.concatCSS_, the pipeline will concatenate the files or no. If _config.addSourceMaps_ is true, the output stream will include the respectively `.map` files.


## LICENSE

  Copyright (c) 2015 Kenzan <http://kenzan.com>

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.