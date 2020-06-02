import { all, takeLatest, put } from 'redux-saga/effects';
import { apiError } from 'actions/api';
import { FETCH_VIDEO_BY_ID, fetchVideoByIdSuccess } from 'actions/player';
import { fetchVideo } from 'utils/net';

function* fetchVideoById({ id }) {
	try {
		const video = yield fetchVideo(id);

		yield put(fetchVideoByIdSuccess({ video }));
	} catch(err) {
		yield put(apiError(err));
	}
}

function* watchFetchVideoById() {
	yield takeLatest(FETCH_VIDEO_BY_ID, fetchVideoById);
}

export default function* playerSaga() {
	yield all([
		watchFetchVideoById()
	]);
}
