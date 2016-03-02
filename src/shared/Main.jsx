import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router';
const Main = React.createClass({

  render: function() {
    const props = this.props;
    return (
      <div className="container">
        <div className="row">
        <Link to="home">Demo</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="library">Library</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="createspec">Create</Link>
        </div>
        <div className="row">werg{this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Main;
