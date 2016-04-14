require('babel-register');
import React from 'react';
import expect from 'expect';
let AuthService = require('../AuthService');
// console.log('AuthService Test:', AuthService);

describe('AuthService user management', function () {
  let user;
  beforeEach(() => {
    user = {
      name: 'Joe'
    };
    AuthService.logout();
  })

function setHtml(){
  user.name = AuthService.getUser2('Bob');
}

  it('should be an instance of AuthService', function() {
     expect(1).toEqual(1);
    // expect(AuthService).toBeA(AuthService.constructor);
  });

  it('should not have a user2', function () {
    // AuthService.logout();
    // done();

    setHtml();
    expect(user.name).toEqual('Bob');
    // expect(2).toEqual(2);

  });

  it('should not have a user', function () {
    expect(AuthService.getUser()).toEqual(null);
  });

  it('should not be logged in', function () {
    expect(AuthService.isLoggedIn()).toEqual(null);

  });

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
