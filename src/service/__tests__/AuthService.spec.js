require('babel-register');
import React from 'react';
import expect from 'expect';
import AuthService from '../AuthService';
import ErrorMsg from '../../service/ErrorMsg';
// console.log('AuthService Test:', AuthService);
const userData = { email: 'aa@aa.com', password: '1234' };
describe('AuthService user management', function () {
  let user;
  beforeEach(() => {
    AuthService.logout();
  })

function setHtml(){
  user.name = AuthService.getUser2('Bob');
}

  it('should be an instance of AuthService', function() {
    expect(AuthService).toBeA(AuthService.constructor);
  });

  const test2 = 'should fail when email is null';
  it(test2, function (done) {
    AuthService.login('', userData.password ).
    catch((x, y, z) => {
      console.log(test2, x);
      expect(x).toEqual(ErrorMsg.login_fail);
      done();
    });
  });

  const test3 = 'should fail when password is null';
  it(test3, function (done) {
    AuthService.login(userData.email, '').
    catch((x) => {
      console.log(test3, x);
      expect(x).toEqual(ErrorMsg.login_fail);
      done();
    });
  });

  const test4 = 'should succeed with valid email and password'
  it(test4, function (done) {

    // if(AuthService.login(userData.email, userData.password) === ErrorMsg.login_fail)

    AuthService.login(userData.email, userData.password).
    then((x) => {
      console.log(test4, x);
      done();
      expect(1).toEqual(1);
    }).
    catch((x) => {
      console.log('failed', x);
      done()
    });


  });
  // it('should not have a user', function () {
  //   expect(AuthService.getUser()).toEqual(null);
  // });
  //
  // it('should not be logged in', function () {
  //   expect(AuthService.isLoggedIn()).toEqual(null);
  //
  // });

  // it('should be logged in', function (done) {
  //
  //   AuthService.auth.onAuth(function(authData) {
  //       if (authData) {
  //         expect(authData).toInclude({provider: 'password'});
  //         expect(authData).toInclude({ password: { email: 'aa@aa.com'}});
  //         done();
  //       } else {
  //         console.log("AuthService:Spec: User is logged out");
  //       }
  //   });
  //   AuthService.login('aa@aa.com','1234');
  //
  // });
  // it('should have login err', function (done) {
  //
  //   AuthService.login('aad@aa.com','134').then((authData) => {
  //     console.log('Promise succeeded');
  //   }).
  //   catch((e, f, g) => {
  //     console.log('the e', e, f, g);
  //           expect(e.code).toEqual('INVALID_USER');
  //           done();
  //
  //   });
  //
  // });
//   it('should have a user', function (done) {
//     // console.log('dang ol done', done);
//       let foo = false;
//
//       // beforeEach( () => {
//
//         // setTimeout(function() {
//         //   foo = true;
//         //   expect(foo).toEqual(true);
//         //   done();
//         // }, 50);
//
//       // });
//
//       let email = 'aa@aa.com',
//         password = '1234';
//
//       // let serv = when.promise((resolve, reject) => {
//         AuthService.auth.onAuth(function(authData) {
//             if (authData) {
//               expect(authData).toInclude({provider: 'password'});
//               expect(authData).toInclude({ password: { email: 'aa@aa.com'}});
//               done();
//             } else {
//               console.log("AuthService:Spec: User is logged out");
//             }
//         });
//         AuthService.login(email, password);
//
//     });
});


  //

  //
  // it('should manage auth status', () => {
  //   setTimeout(function() {
  //     console.log('timout fired');
  //
  //     expect(foo).toEqual(true);
  //     done();
  //   }, 100);
  // });

/*

*/
    // });



    // output = tree.getRenderOutput();
    // var homelink = tree.everySubTree('Button');
    // console.log('homelink', homelink);
    // console.log('the output',output.props.children);
    // expect(typeof serv).toEqual(typeof {});
    // expect(AuthService.getUser()).toEqual(null);
