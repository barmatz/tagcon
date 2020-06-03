import { all, takeLatest, put } from 'redux-saga/effects';
import { PLAYLIST_RECEIVED, playlistItemSelected } from 'actions/playlist';

function* handlePlaylistRecevied({ playlist: { items } }) {
	yield put(playlistItemSelected(items[0]));
}

function* watchReceviedPlaylist() {
	yield takeLatest(PLAYLIST_RECEIVED, handlePlaylistRecevied);
}

export default function* playlistSaga() {
	yield all([
		watchReceviedPlaylist()
	]);
}
