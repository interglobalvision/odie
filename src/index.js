//eslint-disable import/first
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { createStoreWithFirebase } from './firebase';

import './styl';

import rootReducer from './redux';

import App from './containers/App.jsx';

const store = createStoreWithFirebase(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk));

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<App />
		</Router>
	</Provider>
	,
	document.getElementById('root')
);
