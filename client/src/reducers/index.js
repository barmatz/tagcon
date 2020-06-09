import { combineReducers } from 'redux';
import app from './app';
import player from './player';
import playlist from './playlist';
import tagEditor from './tag-editor';
import video from './video';

export default combineReducers({
	app,
	player,
	playlist,
	tagEditor,
	video
});
