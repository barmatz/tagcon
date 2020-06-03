import { PLAYLIST_RECEIVED, PLAYLIST_ITEM_SELECTED } from 'actions/playlist';

const initialState = {
	id: null,
	items: null,
	selectedItem: null
};

export default (state = initialState, { type, playlist, selectedItem }) => {
	switch (type) {
		case PLAYLIST_RECEIVED:
			return { ...state, ...playlist }
		case PLAYLIST_ITEM_SELECTED:
			return { ...state, selectedItem }
		default:
			return state;
	}
}
