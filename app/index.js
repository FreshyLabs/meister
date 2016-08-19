import './lib/es6-polyfill';

import React    from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { AppContainer } from 'react-hot-loader';

import config from './config';
import routes from './routes';

function renderRouter() {
  return <Router history={ browserHistory } routes={ routes }/>;
}

const container = window.document.getElementById( 'meister-container' );

if ( container ) {
  ReactDOM.render(
    config.mode === 'production'
      ? renderRouter()
      : <AppContainer>{ renderRouter() }</AppContainer>
    ,
    container
  );
}

if ( config.mode !== 'production' && module.hot ) {
  module.hot.accept();
}
