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
