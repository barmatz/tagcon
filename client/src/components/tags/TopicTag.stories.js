import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import TopicTag from './TopicTag';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export default {
	component: TopicTag,
	title: 'components/tags/TopicTag'
}

export const basic = () => (
	<TopicTag
		label={text('label', 'I am a tag!')}
		timestamp={text('timestamp', '01:00:00')}
		displayTimestamp={boolean('displayTimestamp', true)}
		description={text('description', description)} />
);
