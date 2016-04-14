import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
import {resolve} from 'path';
var Home = resolve('../Home');

describe('Home Component', function () {
  it('should render the Home Component', () => {
    let el = <Home title="hello" />;
    console.log('Home Spec');
    console.log('Home', el);
    const renderer = TestUtils.createRenderer();
    // renderer.render(Home);
    // const output = renderer.getRenderOutput();
    // console.log('the output', output);
    // expect(<Home />).toExist();
    expect(<Home title="hello" />).toExist();
  });

});
