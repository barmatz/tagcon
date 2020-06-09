import { all, takeLatest, put } from 'redux-saga/effects';
import { UPDATE_PLAYLIST, playlistItemSelected } from 'actions/playlist';

function* handleUpdatePlaylist({ playlist: { items } }) {
	yield put(playlistItemSelected(items[0]));
}

function* watchReceviedPlaylist() {
	yield takeLatest(UPDATE_PLAYLIST, handleUpdatePlaylist);
}

export default function* playlistSaga() {
	yield all([
		watchReceviedPlaylist()
	]);
}
