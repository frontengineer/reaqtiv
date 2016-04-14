
var Firebase = require("firebase");
var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator(require('../config/fb').FB);
var token = tokenGenerator.createToken({ uid: "uniqueId1", some: "arbitrary", data: "here" });
import Rx from 'rx-lite';
import when from 'when';
import objectAssign from 'object-assign';
// import jwt_decode from 'jwt-decode';
import RouterContainer from '../service/RouterContainer';


const auth = new Firebase("https://glaring-inferno-1396.firebaseio.com/");

export const AuthServiceStream = new Rx.Subject();

class AuthService {
  constructor(props){
    const self = this;
    this.auth = props.auth;
    this._stream = AuthServiceStream;
    this.pathname = null;
    this.user = null;
    this.attempt = null;

    this.authDataCallback = this.authDataCallback.bind(this);
    this.auth.onAuth(this.authDataCallback);
  }

  authDataCallback(authData) {
    if (authData) {
      this.user = authData;
      this.attempt = true;
      AuthServiceStream.onNext({ intent: 'LOGIN_USER', payload: {token: authData.token, pathname: (this.pathname || null)} });
      console.log("The User " + authData.uid + " is logged in with " + authData.provider, authData);

    } else {
      this.user = null;
      AuthServiceStream.onNext({ intent: 'LOGOUT_USER', payload: 'jwt'})
      console.log("User is logged out");
    }
  }

  autoLoginUser(token){
    console.log('AuthService:autoLoginUser attempting login', token);
    // let savedJWT = localStorage.getItem('jwt');
    let self = this;
      return when.promise((resolve, reject) => {
        auth.authWithCustomToken(token, function(error, authData) {
          if (error) {
            reject(error);
          } else {
            self.attempt = null;
            resolve(authData);
          }
        });
      });
  }

  createProfile(){
    auth.child('users').child(signUpData.username).transaction(function(currentValue) {
      console.log('AuthService:currentValue', currentValue);

      if(currentValue === null){
        return signUpData;
      } else {
        reject('Already Exist');
      }
    }, function(err, completed, snap) {
      if(err) {
        console.log('Failed to create', err);
        reject(err);
      } else if(completed){
        console.log('Good to go', completed);
        resolve(completed);
      }

      console.log('AuthService:signup snapshot', snap.val());
    })

  }

  checkForDomain(domain){
    // console.log('AuthService:checkForDomain', domain);
    return when.promise((resolve, reject) => {
      auth.child('domains').child(domain).once('value', snapshot => {
        console.log('AuthService:checkForDomain - snapshot', snapshot.val());
        if(snapshot.val()) {
          resolve(true);
        } else {
          reject(false);
        }
      })
    }).catch( x => false);
    //
    // return when.promise((resolve, reject) => {
    //   auth.child('domains').child(domain).transaction(function(currentValue) {
    //     if(currentValue === null){
    //       // return domain;
    //     } else {
    //       return 'blah';
    //       reject({ rsp: 'error', payload: 'Choose another name'});
    //     }
    //   }, function(err, completed, snap) {
    //     if(err) {
    //       reject({ rsp: 'error', payload: err});
    //     } else if(completed){
    //       resolve({ rsp: 'success', payload: completed});
    //     }
    //
    //     // console.log('AuthService:checkForDomain:snapshot', snap.val());
    //   });
    // }).catch(x => 'Please try again');

  }

  login(username, password) {
    console.log('AuthService got login:', username, password);
    let self = this;
    return when.promise((resolve, reject) => {
      auth.authWithPassword({
        email    : username,
        password : password
      }, function (err, authData) {
        if (err) {
          reject(err);
        } else {
          self.attempt = null;
          resolve(authData);
        }
      });

    });
  }

  setTransitionPath(pathname){
    this.pathname = pathname;
  }

  getTransitionPath(pathname){
    return this.pathname;
  }

  getStream(){
    return AuthServiceStream;
  }

  getUser(){
    return this.user;
  }

  getUser2(a){
    return a;
  }

  isLoggedIn(){
    // return when.promise((resolve, reject) => {
    // if(this.attempt) {
    //
    //   setTimeout(this.isLoggedIn, 1000);
    // } else {
      return this.user && !!this.user.provider

    // }
    // });
  }

  logout(){
    auth.unauth();
  }

  // pushStream(data){
  //   return this._stream.onNext(data);
  // }

  signup(signUpData){
    console.log('AuthService:signup attempt user creation', signUpData);
    return when.promise((resolve, reject) => {
      auth.child('users').child(signUpData.username).transaction(function(currentValue) {
        console.log('AuthService:currentValue', currentValue);

        if(currentValue === null){
          return signUpData;
        } else {
          reject('Already Exist');
        }
      }, function(err, completed, snap) {
        if(err) {
          console.log('Failed to create', err);
          reject(err);
        } else if(completed){
          console.log('Good to go', completed);
          resolve(completed);
        }

        console.log('AuthService:signup snapshot', snap.val());
      })
    });
  }

}
const Service = new AuthService({ auth : auth });
export default Service;
module.exports = Service;
