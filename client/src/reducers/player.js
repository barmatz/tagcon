import { PLAYER_PROGRESS } from 'actions/player';

const initialState = {
	currentTime: null
};

export default (state = initialState, { type, currentTime }) => {
	switch (type) {
		case PLAYER_PROGRESS:
			return { ...state, currentTime };
		default:
			return state;
	}
}
