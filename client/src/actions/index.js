// For ajax requests
import axios from 'axios';
import { FETCH_USER } from './types';

// Action creator
export const fetchUser = () => {
	return async (dispatch) => {
		const res = await axios.get('/api/current_user');
		dispatch({ type: 'FETCH_USER', payload: res.data });
	};
};
