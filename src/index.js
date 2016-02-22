import React from 'react';
import Router, {Route, Link, RouteHandler} from 'react-router';
import routes from './routes/routes';

import Model from './store/MainModel';

require('./css/styles.less');

Model.subscribe(appState => {
  Router.run(routes, Router.HistoryLocation, (Handler, state) => {
    React.render(<Handler state={state} appState={appState} />, document.getElementById('app'));
  });
});
