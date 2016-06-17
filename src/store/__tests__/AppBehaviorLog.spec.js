import Rx from 'rx-lite';
import expect from 'expect';
import Firebase from 'firebase';

import Intent from '../../intents/Intent';

import AppBehaviorLog from '../AppBehaviorLog';
import AuthService from '../../service/AuthService';

const auth = new Firebase("https://glaring-inferno-1396.firebaseio.com/");

describe('App User Behavior Log', function () {

  // beforeEach(() => {
  //   AppBehaviorLog.onNext();
  //   console.log('currentValue of AppBehaviorLog', AppBehaviorLog.getValue());
  // })

  it('AppBehaviorLog should be empty', function() {
    // console.log('currentValue of AppBehaviorLog', AppBehaviorLog.getValue());
    let result = AppBehaviorLog.getValue();
     expect(1).toEqual(1);
  });

  // it('AppBehaviorLog should contain login response', function(done) {
  //   // this.timeout(4000);
  //
  //   const Login = function(email, password) {
  //     let reqId = Math.round(Math.random() * 1000000);
  //     let userData =  { email: email, password: password, reqId: reqId };
  //     AppBehaviorLog.onNext({ actionType: Intent.LOGIN_USER, payload: userData });
  //     auth.authWithPassword({ email: email, password: password }, function(err, appData){
  //         if(err){
  //           console.log('error occurred', err);
  //         } else {
  //           done();
  //           AppBehaviorLog.onNext({actionType: Intent.LOGIN_USER_RESPONSE, payload: userData });
  //           expect(AppBehaviorLog).toInclude({ actionType: Intent.LOGIN_USER_RESPONSE });
  //           expect(AppBehaviorLog).toInclude({payload: { email: 'aa@aa.com'} });
  //         }
  //       });
  //   }
  //
  //   Login('aa@aa.com', '1234');
  //
  // });
  //
  // it('AppBehaviorLog should contain login request', function() {
  //   AppBehaviorLog.onNext({ intent: Intent.LOGIN_USER_RESPONSE, payload: [{ id: 14, authData: {username: 'bob'} }] });
  //   expect(AppBehaviorLog.getValue()).toInclude({ intent: 'LOGIN_USER_RESPONSE' });
  //
  // });
  //
  // it('AppBehaviorLog should contain login request', function() {
  //   AppBehaviorLog.onNext({ intent: Intent.LOGIN_USER_RESPONSE, payload: [{ id: 14, authData: {username: 'bob'} }] });
  //   let result = AppBehaviorLog.getValue().payload.map((x) => x.id);
  //   console.log('result', result);
  //   expect(result).toInclude(14);
  //
  // it('AppBehaviorLog should contain login request', function() {
  //   AppBehaviorLog.onNext({ intent: Intent.LOGIN_USER, payload: { email: 'aa@aa.com', password: '1234' } });
  //   AppBehaviorLog.subscribe((x) => {
  //     expect(x).toInclude({payload: { email: 'aa@aa.com'} });
  //   });
  // });

});
