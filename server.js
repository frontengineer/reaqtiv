"use strict";
require("babel-register");

var express = require('express');
var favicon = require('serve-favicon');
var exphbs  = require('express-handlebars');
var vhost = require('vhost');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-router');
var routes = require('./src/routes/routes');

var isProduction = (process.env.NODE_ENV === 'production');
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');

var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');


app.use(express.static(publicPath));
// app.use(favicon(__dirname + '/favicon.ico'));

if(!isProduction) {
  var bundle = require('./server/bundler.js');
  bundle();

  app.all('/build/*', function(req, res) {
    console.log('hot loading', req.url);
    proxy.web(req, res, { target: 'http://localhost:8000/'});
  });


}

app.use(function(req, res){
  console.log('Server:request data host',req.headers.host, req.url, req.path);
  var teamData = { domain: req.headers.host }

    Router.match({ routes : routes, location : req.url }, function(error, redirectLocation, renderProps){

      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        var content = ReactDOMServer.renderToString(React.createElement(Router.RouterContext, renderProps));
        res.status(200).render('index', {teamData: teamData, content: content });
        // res.status(200).send(renderToString(<RouterContext {...renderProps} />))
      } else {
        res.status(404).send('Not found')
      }
    });
});

// Redirect app

var redirect = express();

// redirect.use(function(req, res){
//   if (!module.parent) console.log(req.vhost);
//   res.redirect('http://reaqtiv.com:3000/' + req.vhost[0]);
// });


app.use(vhost('*.reaqtiv.com', redirect)); // Serves all subdomains via Redirect app
app.use(vhost('reaqtiv.com', app)); // Serves top level domain via Main server app

// It is important to catch any errors from the proxy or the
// server will crash. An example of this is connecting to the
// server when webpack is bundling
proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function(){
  console.log('Example app listening at http://localhost:', port);
});
