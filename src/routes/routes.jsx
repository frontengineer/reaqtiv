import { Router } from 'react-router';
import { Route } from 'react-router';
import AuthService from '../service/AuthService';


let DefaultRoute = Router.DefaultRoute;
let React  = require('react');
let Main = require('../shared/Main');
let Home = require('../shared/Home');
let Login = require('../shared/Login');
let SignUp = require('../shared/SignUp');
let Logout = require('../shared/Logout');
let Library = require('../shared/Library');
let CreateSpec = require('../form_builder/CreateSpec');


var r = function(fn, stateTree){
  let appState = null;
  const routes = (
      <Route path="/" component={Main} >
        <Route path="home" component={Home} onEnter={authTransition}/>
        <Route path="login" component={Login} />
        <Route path="signup" component={SignUp} />
        <Route path="logout" component={Logout} />
        <Route path="library" component={Library} onEnter={authTransition} />
        <Route path="createspec" component={CreateSpec} />
      </Route>
    );
  function authTransition(nextState, replace) {
      console.log('authTransition', nextState.location, appState);
      const user = appState._user;
      let jwt = localStorage.getItem('jwt');
      AuthService.setTransitionPath(nextState.location);

      // todo: in react-router 2.0, you can pass a single object to replace :)
      if (!appState._user && !appState._jwt && !jwt) {
        console.log('!USER', appState);
        replace({ pathname: '/login'})
      }

  }
  return {
    getRoutes : () => routes,
    setAppState : (st) => {
      appState = st;
    }
  }
}
module.exports = r();
