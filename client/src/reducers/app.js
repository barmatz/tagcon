import { API_ERROR } from 'actions/api';

const initialState = {
	errors: null
};

export default (state = initialState, { type, err }) => {
	switch (type) {
		case API_ERROR:
			return { ...state, errors: [ ...(state.errors || []), err ] };
		default:
			return state;
	}
}
