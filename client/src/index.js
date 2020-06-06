import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// For making post requests to test email
// import axios from 'axios';
// window.axios = axios;

// Creating a Redux store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
	// Provider tag, a react component that can read changes from redux store anytime the state changes
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
