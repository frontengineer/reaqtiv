var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'index.js');


module.exports = {
  devtool: 'source-map',
  entry: mainPath,
  output : {
    path      : buildPath,
    filename  : 'bundle.js'
  },
  // plugins : [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       // Because uglify reports so many irrelevant warnings.
  //       warnings: false
  //     },
  //     minimize: true
  //   }),
  //   // Write out CSS bundle to its own file:
	// 	new ExtractTextPlugin('style.css', { allChunks: true })
  //
  // ],

  plugins: ([
    // Avoid publishing files when compilation failed:
    new webpack.NoErrorsPlugin(),

    // Aggressively remove duplicate modules:
    new webpack.optimize.DedupePlugin(),

    // Write out CSS bundle to its own file:
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
    new webpack.optimize.OccurenceOrderPlugin(),

    // minify the JS bundle
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings : false },
      minimize: true,
      exclude: [ /\.min\.js$/gi ]		// skip pre-minified libs
    })
  ]),

  resolve: {
    extensions : ['', '.js', '.jsx', '.css', '.less']
  },
  module: {
    loaders : [
      {
        test: /\.(less|css)$/,
        loader : 'style-loader!css-loader!less'
        // loader: ExtractTextPlugin.extract("style?sourceMap", "css?sourceMap!autoprefixer?browsers=last 2 version!less")
      },

      {
        test: /\.jpg$/,
        loader: 'url?limit=25000'
      },
      {test: /\.png$/,  loader: "url?limit=10000&mimetype=image/png" },
      {test: /\.(woff|woff2)$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      {test: /\.ttf$/,  loader: "url?limit=10000&mimetype=application/octet-stream" },
      {test: /\.eot$/,  loader: "file" },
      {test: /\.svg$/,  loader: "url?limit=10000&mimetype=image/svg+xml" },
      {
        test: /\.js?$/,
        loaders: ['jsx-loader?harmony', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules|bower_components/
      },
      { test: /\.handlebars$/, loader: "handlebars-loader" }

    ]
  }
};
