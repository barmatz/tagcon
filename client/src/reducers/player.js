import { PLAYER_SEEK } from 'actions/player';

const initialState = {
	currentTime: null
};

export default (state = initialState, { type, currentTime }) => {
	switch (type) {
		case PLAYER_SEEK:
			return { ...state, currentTime };
		default:
			return state;
	}
}
