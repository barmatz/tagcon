import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { APP_INIT, appDataReceived } from 'actions/app';
import { fetchPlaylist } from 'utils/net';

function* initApp() {
	try {
		const playlist = yield fetchPlaylist();

		yield put(appDataReceived({ playlist }));
	} catch(err) {
		yield put(apiError(err));
	}
}

function* watchInitApp() {
	yield takeLatest(APP_INIT, initApp);
}

export default function* appSaga() {
	yield all([
		watchInitApp()
	]);
}
