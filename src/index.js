import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, match, RouterContext } from 'react-router';

import routes from './routes/routes';

import Model from './store/MainModel';

require('./css/styles.less');

Model.subscribe(appState => {
  let history = browserHistory;
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    console.log('the history', history, routes);
  });
    ReactDOM.render(<Router history={browserHistory} routes={routes} />, document.getElementById('app'));
});
