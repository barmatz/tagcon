import { FETCH_VIDEO_BY_ID_SUCCESS } from 'actions/player';

const initialState = {
	id: null,
	url: null
};

export default (state = initialState, { type, video }) => {
	switch (type) {
		case FETCH_VIDEO_BY_ID_SUCCESS:
			return { ...state, ...video }
		default:
			return state;
	}
}
