// For ajax requests
import axios from 'axios';
import { FETCH_USER } from './types';

// Action creator
export const fetchUser = () => {
	return function (dispatch) {
		axios
			.get('/api/current_user')
			.then((res) => dispatch({ type: 'FETCH_USER', payload: res.data }));
	};
};
