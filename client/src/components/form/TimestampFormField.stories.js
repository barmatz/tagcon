import React from 'react';
import { action } from '@storybook/addon-actions';
import { text, number } from '@storybook/addon-knobs';
import numeral from 'numeral';
import TimestampFormField from './TimestampFormField';

export default {
	component: TimestampFormField,
	title: 'components/form/TimestampFormField'
};

export const basic = () => (
	<TimestampFormField
		name={text('name')}
		currentTime={number('currentTime')}
		startTime={number('startTime')}
		endTime={number('endTime')}
		onChange={action('onChange')} />
);

export const withValueFormat = () => (
	<TimestampFormField
		name={text('name')}
		currentTime={number('currentTime')}
		startTime={number('startTime')}
		endTime={number('endTime')}
		valueFormat={value => numeral(value).format(text('valueFormat', '00:00:00'))}
		onChange={action('onChange')} />
);
