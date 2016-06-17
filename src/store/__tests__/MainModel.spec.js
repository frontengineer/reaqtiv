import React from 'react';
import Rx from 'rx-lite';
import expect from 'expect';

import Intent from '../../intents/Intent';
// let MainModel = require('./MainModel');
// console.log('AuthService Test:', AuthService);
const AppData = new Rx.BehaviorSubject();
const AppDataTransformer = new Rx.BehaviorSubject();
AppDataTransformer.
  scan(function (acc, op) {
    return op(acc);
  }).subscribe(AppData);

describe('MainModel data store', function () {
  let user;
  beforeEach(() => {
    // AppDataLog.onNext();
    // console.log('currentValue of AppDataLog', AppDataLog.getValue());
  })


  it('AppData should be empty', function() {
     expect(AppData.getValue()).toEqual(undefined);
  });

  it('AppData should contain 1,2,3', function() {
    AppDataTransformer.onNext((x) => {
      let z = [1,2,3].map((y) => {
        return y
      });
      return z;
    });
    let currentValue = AppData.getValue();
     expect([3]).toContain(3);
  });

});
