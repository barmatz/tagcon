import React, { useState } from 'react';
import { object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Playlist } from './Playlist';

export default {
	component: Playlist,
	title: 'components/media/Playlist'
}

export const basic = () => {
	const [ selectedItem, setSelectedItem ] = useState(null);

	return (
		<Playlist
			items={object('items', [{
				id: 1
			}, {
				id: 2
			}])}
			selectedItem={selectedItem}
			onItemSelected={item => (setSelectedItem(item), action('onItemSelected')(item))} />
	);
};

export const withSelectedItem = () => (
	<Playlist
		items={object('items', [{
			id: 1
		}, {
			id: 2
		}])}
		selectedItem={{ id: 2 }}
		onItemSelected={action('onItemSelected')} />
);
