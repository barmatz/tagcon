import { UPDATE_TAG_TYPES, SAVING_TAG, TAG_SAVED } from 'actions/tags';

const initialState = {
	tagTypes: null,
	currentTag: null,
	savingTag: false,
	tagSaved: false
};

export default (state = initialState, { type, tagTypes, tag }) => {
	switch (type) {
		case UPDATE_TAG_TYPES:
			return { ...state, tagTypes: tagTypes.map(({ type, label }) => ({ value: type, label })) };
		case SAVING_TAG:
			return { ...state, currentTag: tag, savingTag: true, tagSaved: false };
		case TAG_SAVED:
			return { ...state, currentTag: tag, savingTag: false, tagSaved: true };
		default:
			return state;
	}
}
