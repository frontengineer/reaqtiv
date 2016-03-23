import { Router, Route, IndexRoute } from 'react-router';
import AuthService from '../service/AuthService';
import MainStream from '../store/MainModel';

let ProtectedComponent = require('../service/ProtectedComponent');
let React  = require('react');
let Main = require('../shared/Main');
let Home = require('../shared/Home');
let Login = require('../shared/Login');
let SignUp = require('../shared/SignUp');
let Logout = require('../shared/Logout');
let Library = require('../shared/Library');
let CreateSpec = require('../form_builder/CreateSpec');

const routes = (
  <Route path="/" component={Main} >
    <IndexRoute component={Home}/>
    <Route path="login" component={Login} />
    <Route path="signup" component={SignUp} />
    <Route path="logout" component={Logout} />
    <Route path="library" component={Library} />
    <Route path="createspec" component={ProtectedComponent(CreateSpec)} />
  </Route>
);

module.exports = routes;
