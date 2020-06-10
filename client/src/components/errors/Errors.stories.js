import React from 'react';
import { array } from '@storybook/addon-knobs';
import { Errors } from './Errors';

export default {
	component: Errors,
	title: 'components/layout/Errors'
};

export const basic = () => (
	<Errors
		errors={array('errors', [ 'Sample error' ])} />
);

export const multipleErrors = () => (
	<Errors
		errors={array('errors', [ 'Sample error', 'Another error' ])} />
);
