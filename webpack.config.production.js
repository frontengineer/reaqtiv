var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index'
  ],
  output : {
    path      : __dirname + '/lib/dist/bundle/',
    filename  : 'bundle.js'
  },
  plugins : [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        // Because uglify reports so many irrelevant warnings.
        warnings: false
      },
      minimize: true
    })

  ],
  resolve: {
    extensions : ['', '.js', '.jsx', '.css', '.less']
  },
  module: {
    loaders : [
      {
        test: /\.less$/,
        loader: "style!css!less"
      },
      {
        test: /\.css$/, // Only .css files
        loader: 'style!css' // Run both loaders
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
        loaders: ['jsx-loader?harmony', 'babel?optional[]=runtime&stage=1'],
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
