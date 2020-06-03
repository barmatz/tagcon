import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { APP_INIT } from 'actions/app';
import { playlistReceived } from 'actions/playlist';
import { fetchPlaylist } from 'utils/net';

function* handleInitApp() {
	try {
		const playlist = yield fetchPlaylist();

		yield put(playlistReceived(playlist));
	} catch(err) {
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
