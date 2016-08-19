// TODO: need to start breaking apart these routes. too much going on in here
/* eslint-disable */
import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

import Index         from './views/index';
import Home          from './views/home';

function Blank() {
  return <div />;
}

function NotFoundHandler() {
  return <div className="pagenotfound">Page Not Found</div>;
}

const routes = (
  <Route name="app" path="/" component = {Index}>
    <IndexRoute component={Home} />
    <Route path="*" component={NotFoundHandler} />
  </Route>
);

export default routes;
