var IgnorePlugin = require('webpack').IgnorePlugin;
var path = require('path');
// var IgnorePlugin = require('webpack').IgnorePlugin;
console.log('Karma: test server will run ', (process.env.SINGLE_RUN ? 'once': 'until stopped manually'));
module.exports = function(config){
  config.set({
    basePath: './',
    browsers: ['PhantomJS'],
    singleRun: process.env.SINGLE_RUN || false,
    frameworks: ['mocha'],
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      // 'node_modules/karma-babel-preprocessor/node_modules/babel-polyfill/dist/polyfill.js',
      'src/**/**/*.spec.js'
      // // 'node_modules/react/dist/react.min.js',
      // // 'node_modules/rx-lite/rx.lite.min.js',
      // 'src/**/**/*-test.js'
    ],
    plugins: [
      'karma-mocha',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-coverage'
    ],
    preprocessors: {
      // 'node_modules/react/react.js': ['babel'],
      'src/**/**/*.spec.js' : ['webpack', 'sourcemap']
    },
    babelPreprocessor: {
      options: {
        sourceMap: 'inline'
      },
      filename: function (file) {
        return file.originalPath.replace(/\.js$/, '.es5.js');
      },
      sourceFileName: function (file) {
        return file.originalPath;
      }
    },

    resolve: {
      extensions : ['', '.js', '.jsx']
    },

    reporters: [ 'mocha', 'coverage' ],
    coverageReporter: {
      reporters: [
        { type: 'html', dir: 'coverage/', subdir: '.' },
        // { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' }
      ]
    },
    webpack : {
      noInfo: true,
      devtool: 'source-map', //just do inline source maps instead of the default
      plugins: [
        new IgnorePlugin(/ReactContext/),
      ],

      module: {
        loaders : [{
          test: /\.(js|jsx)$/, exclude: /(bower_components|node_modules)/,
          loader: 'babel-loader'
        }],
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|tests)/,
          loader: 'istanbul-instrumenter'
        }]
      },
      watch: true
    },
    webpackMiddleware: {
     noInfo: true,
     stats: {
         color: true,
         chunkModules: false,
         modules: false
     }
   },
    webPackServer : {
      noInfo: true
    }
  });
};
