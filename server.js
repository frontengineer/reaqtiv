"use strict";
require("babel-register");

var express = require('express');
// import hogan from 'hogan-express';
var exphbs  = require('express-handlebars');
var vhost = require('vhost');
var path = require('path');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer();

var React   = require('react');
import { renderToString } from 'react-dom/server'
import { match } from 'react-router';
import { RouterContext } from 'react-router';



var isProduction = (process.env.NODE_ENV === 'production');
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'public');
function createVirtualHost(domainName, dirPath) {
    return vhost(domainName, express.static( dirPath ));
}
var app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');

app.use(express.static(publicPath));
var routes = require('./src/routes/routes').getRoutes();



if(!isProduction) {
  var bundle = require('./server/bundler.js');
  bundle();

  app.all('/bundle/*', function(req, res) {
    proxy.web(req, res, { target: 'http://localhost:8000'});
  });


}


// Model.subscribe(appState => {
//   ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
// });
app.use(function(req, res){
  console.log('Server:request data host',req.headers.host);
  let teamData = { domain: req.headers.host }

    match({ routes, location : req.url }, (error, redirectLocation, renderProps) => {
      const content = renderToString(<RouterContext {...renderProps} />);
      // res.locals.content = content;


      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        res.status(200).render('index', {teamData, content });
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

// Vhost app

// var vapp = module.exports = express();

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
