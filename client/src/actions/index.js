// For ajax requests
import axios from 'axios';
// import { FETCH_USER } from './types';

// Action creator for fetching user info to know wheather user is logged in or not
export const fetchUser = () => {
	return async (dispatch) => {
		const res = await axios.get('/api/current_user');
		dispatch({ type: 'FETCH_USER', payload: res.data });
	};
};

// Action creator to take the stripe token and send to backend API for biiling the user
export const handleToken = (token) => {
	return async (dispatch) => {
		const res = await axios.post('/api/stripe', token);
		dispatch({ type: 'FETCH_USER', payload: res.data });
	};
};
