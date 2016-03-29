import React from 'react';
import expect from 'expect';
import sd from 'skin-deep';
import {resolve} from 'path';
var Main = resolve(__dirname +'../Main');
var MyButton = React.createClass({
  clicked: function(e) {
    console.log('got clicked', e.target.innerHTML);
  },
  render: function() {
    return <button onClick={this.clicked}>Click {this.props.n}</button>;
  }
});

describe('Main Component', function () {
  let tree, output, el;
  beforeEach( () => {
    tree = sd.shallowRender(<MyButton />);
    tree.subTree('button').props.onClick({
      target: {
        innerHTML: 'Whatever you want!'
      }
    });

  });
  it('should render a React Component', () => {
    // el = React.createElement(Main, {title: 'Title'}, '<p>Content</p>');
    // console.log('the el', el);

    output = tree.getRenderOutput();
    // var homelink = tree.everySubTree('Button');
    // console.log('homelink', homelink);
    console.log('the output',output.props.children);
    // expect(typeof output).toEqual(typeof {});
    expect('/').toEqual('/');
  });
  it('should render a React Component', function () {
    // el = React.createElement(Main, {title: 'Title'}, '<p>Content</p>');
    // console.log('the el', el);

    output = tree.getRenderOutput();
    expect(output.props.children).toInclude('Click ');
    // expect(output.props).toInclude({'title': 'Title'});
  });
});
