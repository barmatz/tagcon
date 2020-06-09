import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { APP_INIT } from 'actions/app';
import { updatePlaylist } from 'actions/playlist';
import { updateTagTypes } from 'actions/tags';
import { fetchPlaylist, fetchTagTypes } from 'utils/net';

function* handleInitApp() {
	try {
		const playlist = yield fetchPlaylist();

		yield put(updatePlaylist(playlist));
	} catch(err) {
		yield put(apiError(err));
	}

	try {
		const tagTypes = yield fetchTagTypes();

		yield put(updateTagTypes(tagTypes));
	} catch (err) {
		yield put(apiError(err));
	}
}

function* watchInitApp() {
	yield takeLatest(APP_INIT, handleInitApp);
}

export default function* appSaga() {
	yield all([
		watchInitApp()
	]);
}
