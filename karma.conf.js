var IgnorePlugin = require('webpack').IgnorePlugin;
var path = require('path');
// var IgnorePlugin = require('webpack').IgnorePlugin;
console.log('Karma: test server will run ', (process.env.SINGLE_RUN ? 'once': 'until stopped manually'));
module.exports = function(config){
  config.set({
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      // 'src/**/**/*.js',
      // 'src/**/*.jsx',
      // 'src/**/*.spec.js'
      'tests.webpack.js'
      // 'src/**/**/*-test.js'
    ],

    preprocessors: {
      // 'node_modules/react/react.js': ['babel'],
      // 'src/**/*.js' : ['webpack', 'coverage'],
      // 'src/**/*.jsx' : ['webpack', 'react-jsx', 'coverage'],
      'tests.webpack.js' : ['webpack', 'sourcemap']
      // 'src/**/*.spec.js' : [ 'webpack', 'sourcemap']
    },
    // basePath: './',
    browsers: ['PhantomJS'],
    singleRun: true,
    // autoWatch: true,
    frameworks: ['mocha'],

    reporters: ['mocha', 'coverage' ],

     coverageReporter: {
      //  dir : 'coverage/',
       reporters: [
        //  { type: 'html', subdir: 'html' },
        //  { type: 'lcov', subdir: '.', file: 'lcov.info'},
        //  { type: 'lcovonly', subdir: '.', file: 'lcov-js.info' },
         { type: 'text-summary' }
       ]
     },

    //
    // resolve: {
    //   extensions : ['', '.js', '.jsx']
    // },

    webpack : {
      // noInfo: true,
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      plugins: [
        new IgnorePlugin(/ReactContext/),
      ],
      node: {
        fs: "empty"
      },
      module: {
        loaders: [
         {
           test: /\.(js|jsx?)$/,
           exclude: /(bower_components|node_modules)/,
           loader: 'babel-loader'
         }
        ],
        postLoaders: [{
          test: /\.(js|jsx)$/, exclude: /(node_modules|bower_components|__tests__)/,
          loader: 'istanbul-instrumenter'
        }]

      },
    },
    webPackServer: {
     noInfo: true,
   }
 });
};
