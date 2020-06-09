import { UPDATE_PLAYLIST, PLAYLIST_ITEM_SELECTED } from 'actions/playlist';

const initialState = {
	id: null,
	items: null,
	selectedItem: null
};

export default (state = initialState, { type, playlist, selectedItem }) => {
	switch (type) {
		case UPDATE_PLAYLIST:
			return { ...state, ...playlist }
		case PLAYLIST_ITEM_SELECTED:
			return { ...state, selectedItem }
		default:
			return state;
	}
}
