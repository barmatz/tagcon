import React from 'react';
import { object, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TEXT_TAG, PERSON_TAG, TOPIC_TAG } from './Tag';
import { TagEditor } from './TagEditor';

export default {
	component: TagEditor,
	title: 'components/tags/TagEditor'
}

export const basic = () => (
	<TagEditor
		tagTypes={object('typeTypes', [{
			value: TEXT_TAG
		}, {
			value: PERSON_TAG
		}, {
			value: TOPIC_TAG
		}])}
		playerCurrentTime={number('playerCurrentTime', 0)}
		savingTag={boolean('savingTag', false)}
		tagSaved={boolean('tagSaved', false)}
		onSaveTag={action('onSaveTag')} />
);