//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router';

import { createStoreWithFirebase } from './firebase';
import { history } from './history';

import './styl';

import rootReducer from './redux';

import App from './containers/App.jsx';

const store = createStoreWithFirebase(
  connectRouter(history)(rootReducer),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunk,
    routerMiddleware(history)
  ));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root')
);
