import React from 'react';
import expect from 'expect';
import when from 'when';
import sd from 'skin-deep';
import {resolve} from 'path';
let AuthService = require('../AuthService');

describe('AuthService user management', function () {
  it('should be an instance of AuthService', function() {
    expect(AuthService).toBeA(AuthService.constructor);
  });

  it('should not have a user', function () {
    AuthService.logout();
    // done();
    expect(AuthService.getUser()).toEqual(null);

  });
  it('should have a user', function (done) {
    // console.log('dang ol done', done);
      let foo = false;

      // beforeEach( () => {

        // setTimeout(function() {
        //   foo = true;
        //   expect(foo).toEqual(true);
        //   done();
        // }, 50);

      // });

      let email = 'aa@aa.com',
        password = '1234';

      // let serv = when.promise((resolve, reject) => {
        AuthService.auth.onAuth(function(authData) {
            if (authData) {
              expect(authData).toInclude({provider: 'password'});
              expect(authData).toInclude({ password: { email: 'aa@aa.com'}});
              done();
            } else {
              console.log("AuthService:Spec: User is logged out");
            }
        });
        AuthService.login(email, password);

    });
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
