import React from 'react';
import { object, number } from '@storybook/addon-knobs';
import { Tags } from './Tags';

export default {
	component: Tags,
	title: 'components/tags/Tags'
}

export const basic = () => (
	<Tags
		currentTime={number('currentTime', 0)}
		tags={object('tags', [{
			label: 'My First Tag',
			timestamp: {
				start: 0,
				end: 60
			}
		}, {
			label: 'My Second Tag',
			timestamp: {
				start: 30,
				end: 90
			}
		}, {
			label: 'My Third Tag',
			timestamp: {
				start: 60,
				end: 120
			}
		}])} />
);