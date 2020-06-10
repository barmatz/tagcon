import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Player } from './Player';

export default {
	component: Player,
	title: 'components/media/Player'
}

export const basic = () => (
	<Player
		url={text('url', 'https://www.youtube.com/watch?v=wln1dGUfEGI')}
		lockPlayback={boolean('lockPlayback', false)}
		onProgress={action('onProgress')}
		onSeek={action('onSeek')} />
);