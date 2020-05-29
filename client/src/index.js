import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';

// Creating a Redux store
const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
	// Provider tag, a react component that can read changes from redux store anytime the state changes
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
);
