"use strict";
require("babel/register");
require('node-jsx').install({ extension: '.js', harmony: true });

var express = require('express');
var exphbs  = require('express-handlebars');
var React   = require('react');
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
var app = express();
var bundlePath = (process.env.NODE_ENV === 'production') ? 'dist/bundle/bundle.js' : 'http://localhost:8080/bundle/bundle.js';
var port = process.env.PORT || 3000;
//set hb
var helpers = {
    json : function(payload){
      return JSON.stringify(payload);
    }
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/dist/bundle', express.static(__dirname + '/dist/bundle'));

var routes = require('./routes/routes');
// Model.subscribe(appState => {
//   ReactDOM.render(<Router history={browserHistory}>{routes}</Router>, document.getElementById('app'));
// });

app.use(function(req, res){
  //Router.run(routes, req.path, function(Handler, state){
    // var content = React.renderToString(React.createElement(Handler, { state: state }));
    // res.render('index', { content: content, bundlePath : bundlePath, helpers: helpers });
    let location = req.url;
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        // You can also check renderProps.components or renderProps.routes for
        // your "not found" component or route respectively, and send a 404 as
        // below, if you're using a catch-all route.
        var content = renderToString(<RouterContext {...renderProps} />);
        res.render('index', { content: content, bundlePath : bundlePath, helpers: helpers });
        // res.status(200).send(renderToString(<RouterContext {...renderProps} />))
      } else {
        res.status(404).send('Not found')
      }
    });

    // var element = React.createElement(Handler);
    // console.log('req.path', req.path);
    // var html = React.renderToString(element);
    // res.render('main', { content: html, bundlePath : bundlePath });

  //});
});

var server = app.listen(port, function(){
  console.log('running mode: ' + process.env.NODE_ENV);
  console.log('Example app listening at http://localhost:', port);
});
