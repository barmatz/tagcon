import { all } from 'redux-saga/effects';
import app from './app';
import player from './player';
import playlist from './playlist';

export default function* rootSaga() {
	yield all([
		app(),
		player(),
		playlist()
	]);
}
