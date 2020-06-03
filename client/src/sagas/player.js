import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { FETCH_VIDEO_BY_ID, fetchVideoById, fetchVideoByIdSuccess } from 'actions/video';
import { PLAYLIST_ITEM_SELECTED } from 'actions/playlist';
import { fetchVideo } from 'utils/net';

function* handlePlaylistItemSelected({ selectedItem: { id } }) {
	yield put(fetchVideoById(id));
}

function* watchPlaylistItemSelected() {
	yield takeLatest(PLAYLIST_ITEM_SELECTED, handlePlaylistItemSelected);
}

function* handleFetchVideoById({ id }) {
	try {
		const video = yield fetchVideo(id);

		yield put(fetchVideoByIdSuccess(video));
	} catch(err) {
		yield put(apiError(err));
	}
}

function* watchFetchVideoById() {
	yield takeLatest(FETCH_VIDEO_BY_ID, handleFetchVideoById);
}

export default function* playerSaga() {
	yield all([
		watchPlaylistItemSelected(),
		watchFetchVideoById()
	]);
}
