var Webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./../webpack.config.development.js');
var path = require('path');
var fs = require('fs');
var mainPath = path.resolve(__dirname, '..', 'src', 'index.js');

module.exports = function() {
  var bundleStart = null;
  var compiler = Webpack(webpackConfig);

  // We give notice in the terminal when it starts bundling and
  // set the time it started
  compiler.plugin('compile', function() {
    console.log('Bundling...');
    bundleStart = Date.now()
  });

  // We also give notice when it is done compiling, including the
  // time it took. Nice to have
  compiler.plugin('done', function() {
    console.log('Bundled in ' + (Date.now() - bundleStart) + 'ms!');
  });

  var bundler = new WebpackDevServer(compiler, {
    publicPath: '/bundle/',

    hot: true,

    quiet: false,
    noInfo: true,
    stats: {
      colors: true
    }
  });

  // We fire up the development server and give notice in the terminal
  // that we are starting the initial bundle
  bundler.listen(8000, 'localhost', function () {
    console.log('Bundling project, please wait...');
  });

};
