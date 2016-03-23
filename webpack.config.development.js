var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var bowerComponentsPath = path.resolve(__dirname, 'bower_components');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(__dirname, 'src', 'index.js');

var devDomain =  'localhost';

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + devDomain + ':8000',
    'webpack/hot/only-dev-server',
    mainPath
  ],
  output : {
    path      : buildPath,
    filename  : 'bundle.js',
    publicPath: '/build/'
  },
  plugins: ([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),

    // Write out CSS bundle to its own file:
    new ExtractTextPlugin('style.css', { allChunks: true })
  ]).concat(process.env.WEBPACK_ENV==='dev' ? [] : [
    new webpack.optimize.OccurenceOrderPlugin(),
  ]),

  // plugins : [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin()
  // ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions : ['', '.js', '.jsx', '.less', '.css']
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
        loaders: ['react-hot', 'babel-loader'],
        exclude: [nodeModulesPath, bowerComponentsPath]
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: [nodeModulesPath, bowerComponentsPath]
      }
    ]
  }
};
