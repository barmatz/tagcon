import { all } from 'redux-saga/effects';
import app from './app';
import player from './player';
import playlist from './playlist';
import tagEditor from './tag-editor';

export default function* rootSaga() {
	yield all([
		app(),
		player(),
		playlist(),
		tagEditor()
	]);
}
