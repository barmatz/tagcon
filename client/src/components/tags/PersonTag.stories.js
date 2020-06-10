import React from 'react';
import { text, boolean, object } from '@storybook/addon-knobs';
import PersonTag from './PersonTag';

export default {
	component: PersonTag,
	title: 'components/tags/PersonTag'
}

export const basic = () => (
	<PersonTag
		label={text('label', 'I am a tag!')}
		timestamp={text('timestamp', '01:00:00')}
		displayTimestamp={boolean('displayTimestamp', true)}
		image={text('image', 'https://randomuser.me/api/portraits/men/36.jpg')}
		links={object('links', [{
			type: 'twitter',
			url: 'https://twitter.com'
		}, {
			type: 'linkedin',
			url: 'https://linkedin.com'
		}])} />
);
