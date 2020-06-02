import { all } from 'redux-saga/effects';
import app from './app';
import player from './player';

export default function* rootSaga() {
	yield all([
		app(),
		player()
	]);
}
