import React from 'react';
import { text, number, boolean, select, object } from '@storybook/addon-knobs';
import Tag, { TEXT_TAG, PERSON_TAG, TOPIC_TAG } from './Tag';

const tagTypes = [ TEXT_TAG, PERSON_TAG, TOPIC_TAG ];

export default {
	component: Tag,
	title: 'components/tags/Tag'
}

export const basic = () => (
	<Tag
		type={select('type', tagTypes)}
		label={text('label', 'I am a tag!')}
		timestamp={{
			start: number('timestamp.start', 0),
			end: number('timestamp.end', 60)
		}}
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