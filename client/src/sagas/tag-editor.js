import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { SAVE_TAG, savingTag, tagSaved } from 'actions/tags';
import { pushTag } from 'utils/net';

function* handleSaveTag({ tag }) {
	try {
		yield put(savingTag(tag));

		const newTag = yield pushTag(tag);

		yield put(tagSaved(newTag));
	} catch (err) {
		yield put(apiError(err));
	}
}

function* watchSaveTag() {
	yield takeLatest(SAVE_TAG, handleSaveTag);
}

export default function* tagEditorSaga() {
	yield all([
		watchSaveTag()
	]);
}
