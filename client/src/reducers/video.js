import { FETCH_VIDEO_BY_ID_SUCCESS } from 'actions/video';

const initialState = {
	id: null,
	url: null,
	tags: null
};

export default (state = initialState, { type, video }) => {
	switch (type) {
		case FETCH_VIDEO_BY_ID_SUCCESS:
			return { ...state, ...video }
		default:
			return state;
	}
}
