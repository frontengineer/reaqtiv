let Router = require('react-router');
let Route = Router.Route;
let DefaultRoute = Router.DefaultRoute;
let React  = require('react');
let TodoApp = require('../shared/TodoApp');
let Home = require('../shared/Home');
let Demo = require('../shared/Demo');
let Library = require('../shared/Library');
let CreateSpec = require('../form_builder/CreateSpec');
// sign up
// log in
// demo
// specs
// logged in team Home
//// team
//// team/products
//// team/product/:id
//// team/upload
//// team/contacts
//// team/specs
//// my profile
////

module.exports = (
  <Route handler={TodoApp} path="/">
    <DefaultRoute handler={Home} />
    <Route name="Home" handler={Home} />
    <Route name="Demo" path="demo" handler={Demo} />
    <Route name="Library" path="library" handler={Library} />
    <Route name="CreateSpec" path="/library/createstandard" handler={CreateSpec} />
  </Route>
);
