var path = require('path');
console.log('where at: ', path.resolve(__dirname, 'src', 'form_builder'));
// console.log('where at: ', path.resolve('./src/form_builder'));

// var IgnorePlugin = require('webpack').IgnorePlugin;
console.log('Karma: test server will run ', (process.env.SINGLE_RUN ? 'once': 'until stopped manually'));
module.exports = function(config){
  config.set({
    files: [
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/karma-babel-preprocessor/node_modules/babel-polyfill/dist/polyfill.js',
      // 'src/**/**/*.js',
      // './src/shared/Home.jsx',
      // './src/shared/Demo.jsx',
      // './src/shared/Footer.jsx',
      './src/form_builder/CreateSpec.jsx',
      './src/shared/*.jsx',
      // './src/**/*.js*',
      './src/**/*.spec.js'
      // 'tests.webpack.js'
      // 'src/**/**/*-test.js'
    ],

    preprocessors: {
      // 'node_modules/react/react.js': ['babel'],
      // './src/**/**' : ['webpack', 'sourcemap'],
      './src/**/*.js' : ['webpack', 'sourcemap'],
      './src/**/*.jsx' : ['webpack', 'sourcemap'],
      // 'tests.webpack.js' : ['webpack', 'sourcemap']
      './src/**/*.spec.js' : [ 'webpack', 'sourcemap']
    },
    // basePath: path.resolve(__dirname),
    browsers: ['PhantomJS'],
    singleRun: process.env.SINGLE_RUN ? true : false,
    // autoWatch: true,
    frameworks: ['mocha'],

    reporters: ['mocha', 'coverage' ],

     coverageReporter: {
      //  instrumenters: { 'istanbul-react' : require('istanbul-react') },
      //  instrumenter: {
      //    '**/*.jsx': 'istanbul-react'
      //  },
       reporters: [
        //  { type: 'html', subdir: 'html' },
         { type: 'lcov', subdir: '.'},
        //  { type: 'lcovonly', subdir: '.', file: 'lcov-js.info' },
         { type: 'text-summary' }
       ]
     },

    //
    resolve: {
      // modulesDirectories : ['shared', 'form_builder', 'utils', 'constants'],
      extensions : ['', '.js', '.jsx']
      // ,
      // root: [
      //   path.resolve('./src'),
      //   path.resolve('./src/form_builder'),
      //   path.resolve('./src/shared'),
      //   path.resolve('./src/utils'),
      //   path.resolve('./src/form_builder/Input.js'),
      //   path.resolve('./src/constants')
      // ],
      // root: [
      //     path.resolve(__dirname)
      // ],
      // root: '/Users/davidparnell/Sites/sandbox/reaqtiv/src',
      // alias: {
      //   // src : 'src',
      //   constants  : path.resolve(__dirname, 'src', 'constants'),
      //   form_builder  : path.resolve(__dirname, 'src', 'form_builder'),
      //   shared        : path.resolve(__dirname, 'src', 'shared'),
      //   store        : path.resolve(__dirname, 'src', 'store'),
      //   utils        : path.resolve(__dirname, 'src', 'utils'),
      //   // Input         : 'src/form_builder/Input'
      // },
    },

    webpack : {
      // noInfo: true,
      devtool: 'inline-source-map', //just do inline source maps instead of the default
      // plugins: [
      //   new IgnorePlugin(/ReactContext/),
      // ],
      node: {
        fs: "empty"
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader'
          },
          {
            test: /\.jsx?$/,
            exclude: /(bower_components|node_modules)/,
            loader: 'babel-loader'
          }
        ],
        postLoaders: [{
          test: /\.(js|jsx?)$/, exclude: /(node_modules|bower_components|__tests__)/,
          loader: 'istanbul-instrumenter'
        }]

      },
    },
    webPackServer: {
     noInfo: true,
   }
 });
};
