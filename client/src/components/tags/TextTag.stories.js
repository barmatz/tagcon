import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import TextTag from './TextTag';

export default {
	component: TextTag,
	title: 'components/tags/TextTag'
}

export const basic = () => (
	<TextTag
		label={text('label', 'I am a tag!')}
		timestamp={text('timestamp', '01:00:00')}
		displayTimestamp={boolean('displayTimestamp', true)} />
);
