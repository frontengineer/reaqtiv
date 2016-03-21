import React from 'react';
import Rx from 'rx-lite';
import objectAssign from 'object-assign';
import AuthService from '../service/AuthService';
import LoginIntentStream from '../intents/LoginIntent';
import jwt_decode from 'jwt-decode';


let stateTree = {
  user        : null,
  jwt         : null,
  isLoggedIn  : AuthService.isLoggedIn()
};
const MainStream = new Rx.BehaviorSubject(stateTree);

class MainModel {
  constructor() {
    this.MainModel$ = MainStream;
  }

  // Just getters for the properties it got from the action.
  get stream() {
    return this.MainModel$;
  }
}

LoginIntentStream.subscribe(action => {
  switch (action.intent) {
    case 'LOGIN_USER':
    console.log('MainModel:LoginIntentStream first', action);
    let newTree =  {
      jwt         : action.payload,
      user        : jwt_decode(action.payload),
      isLoggedIn  : AuthService.isLoggedIn()
    };
    stateTree = objectAssign({}, stateTree, newTree)
    MainStream.onNext(stateTree);
      break;
    default:

  }
  // Model.onNext(x);
});


export default new MainModel();
