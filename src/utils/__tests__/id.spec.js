
var expect = require('expect');
var ID = require('../id');

describe('Main Component', function () {
  console.log('the ID', ID);

  it('should return the same identity', () => {
    // el = React.createElement(Main, {title: 'Title'}, '<p>Content</p>');
    // console.log('the el', el);

    // var homelink = tree.everySubTree('Button');
    // console.log('homelink', homelink);
    // expect(typeof output).toEqual(typeof {});
    expect(ID(3)).toEqual(3);
  });

});
