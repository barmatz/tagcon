import { combineReducers } from 'redux';
import app from './app';
import player from './player';
import playlist from './playlist';
import video from './video';

export default combineReducers({
	app,
	player,
	playlist,
	video
});
