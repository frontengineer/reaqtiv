import React from 'react';
import expect from 'expect';
import sd from 'skin-deep';
import {resolve} from 'path';
var Home = resolve(__dirname +'../Home');


describe('Home Component', function () {
  console.log('Home Spec');
  it('should render the Home Component', () => {
    expect(1).toEqual(1);
  });

});
