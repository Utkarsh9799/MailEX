// For ajax requests
import axios from 'axios';
import { FETCH_USER } from './types';
import { request } from 'express';

// Action creator
const fetchUser = () => {
	return function (dispatch) {
		axios
			.get('/api/current_user')
			.then((res) => dispatch({ type: 'FETCH_USER', payload: request }));
	};
};
