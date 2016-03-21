import React from 'react';
import { Router, Route, Link } from 'react-router';
import RouterContainer from '../service/RouterContainer';
import AuthService from '../service/AuthService';

const Main = React.createClass({
  // componentWillReceiveProps: function(nextProps, nextState){
  //   console.log('Main:componentWillReceiveProps', nextProps, nextState);
  //   this.forceUpdate();
  // },

  // componentDidMount: function () {
  //   console.log('Main: this', this);
  //   console.log('Main: props', this.props);
  // },
  render: function() {
    // console.log('Main: props render', this.props);
  const props = this.props;
    return (
      <div className="container">
        <div className="row">
        <Link to="/">Home</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="home">Demo</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="library">Library</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="createspec">Create</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="login">Sign In</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="logout">Sign Out</Link>
        </div>
        <div className="row">
          <div className="well"><Link to="signup">Join Us!</Link></div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Main;
