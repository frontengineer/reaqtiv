var webpack = require('webpack');
var path = require('path');

var devDomain =  'localhost';

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://' + devDomain + ':8000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output : {
    path      : __dirname + '/bundle/',
    filename  : 'bundle.js',
    publicPath: 'http://' + devDomain + ':8000/bundle/'
  },
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react')
    },
    extensions : ['', '.js', '.jsx', '.less', '.css']
  },
  module: {
    loaders : [
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
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
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules|bower_components/
      }
    ]
  }
};
