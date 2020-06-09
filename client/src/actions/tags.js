export const UPDATE_TAG_TYPES = 'UPDATE_TAG_TYPES';

export const updateTagTypes = tagTypes => ({ type: UPDATE_TAG_TYPES, tagTypes });

export const SAVE_TAG = 'SAVE_TAG';

export const saveTag = tag => ({ type: SAVE_TAG, tag });

export const SAVING_TAG = 'SAVING_TAG';

export const savingTag = tag => ({ type: SAVING_TAG, tag });

export const TAG_SAVED = 'TAG_SAVED';

export const tagSaved = tag => ({ type: TAG_SAVED, tag });
