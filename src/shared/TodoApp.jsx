import React, { Component } from 'react';
const Router = require('react-router');
const Link = Router.Link;
const RouteHandler = Router.RouteHandler;
const TodoApp = React.createClass({

  render: function() {
    const props = this.props;
    return (
      <div className="container">
        <div className="row">
        <Link to="Demo">Demo</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="Library">Library</Link>
          &nbsp;&nbsp;&nbsp;
        <Link to="CreateSpec">Create</Link>
        </div>
        <div className="row">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

module.exports = TodoApp;
