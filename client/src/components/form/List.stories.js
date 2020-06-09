import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, text } from '@storybook/addon-knobs';
import List from './List';

export default {
	component: List,
	title: 'List',
	decorators: [ withKnobs ]
};

export const basic = () => {
	const [ myList, setMyList ] = useState([]);

	return (
		<List
			name={text('name', 'my-list')}
			label={text('label', 'My List')}
			items={myList}
			onChange={event => {
				setMyList(event.target.value)
				action('onChange')(event);
			}} />
	);
};

export const withCustomItem = () => {
	const [ myList, setMyList ] = useState([]);

	return (
		<List
			name={text('name', 'my-list')}
			label={text('label', 'My List')}
			items={myList}
			onChange={event => {
				setMyList(event.target.value)
				action('onChange')(event);
			}}>
			{item => <div>{item}</div>}
		</List>
	);
};
