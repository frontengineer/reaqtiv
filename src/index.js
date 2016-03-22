import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, match, RouterContext } from 'react-router';
import RouterContainer from './service/RouterContainer';
import routes from './routes/routes';
import objectAssign from 'object-assign';

import Model from './store/MainModel';
require('./css/styles.less');

RouterContainer.set(Router);
Model.MainModel$.subscribe(appState => {
  console.log('Index.js: the appState', appState);

  function createElement(Component, props) {
    // make sure you pass all the props in!
    console.log('Create element has been called.', props);
    let combinedStateTree = objectAssign({}, props, appState)
    return <Component {...combinedStateTree} />
  }
  let history = browserHistory;
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    console.log('Index:the browserHistory', browserHistory, routes, renderProps);
    ReactDOM.render(<Router createElement={createElement} history={history} routes={routes} />, document.getElementById('app'));
  });
});
