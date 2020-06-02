import { API_ERROR } from 'actions/api';
import { APP_DATA_RECEIVED } from 'actions/app';

const initialState = {
	errors: null,
	playlist: null
};

export default (state = initialState, { type, err, playlist }) => {
	switch (type) {
		case API_ERROR:
			return { ...state, errors: [ ...(state.errors || []), err ] };
		case APP_DATA_RECEIVED:
			return { ...state, playlist }
		default:
			return state;
	}
}
