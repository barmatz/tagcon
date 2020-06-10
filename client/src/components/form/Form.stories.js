import React, { useState } from 'react';
import { text, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import Form from './Form';
import FormField from './FormField';

export default {
	component: Form,
	title: 'components/form/Form'
}

export const basic = () => {
	const [ value1, setValue1 ] = useState('');

	return (
		<Form
			disabled={boolean('disabled', false)}
			onSubmit={action('onSubmit')}>
			<FormField
				name={text('name', 'field1')}
				label={text('label', 'Field 1')}
				value={value1}
				placeholder={text('placeholder', 'my first field..')}
				onChange={event => (setValue1(event.target.value), action('onField1Change')(event))} />
		</Form>
	);
};

export const withCustomSubmitButton = () => {
	const [ value1, setValue1 ] = useState('');

	return (
		<>
			<button onClick={action('onSubmit')}>External Submit</button>
			<Form
				disabled={boolean('disabled', false)}
				disableSubmitButton={true}
				onSubmit={action('onSubmit')}>
				<FormField
					name={text('name', 'field1')}
					label={text('label', 'Field 1')}
					value={value1}
					placeholder={text('placeholder', 'my first field..')}
					onChange={event => (setValue1(event.target.value), action('onField1Change')(event))} />
			</Form>
		</>
	);
};

export const withMultipleFields = () => {
	const [ value1, setValue1 ] = useState('')
			, [ value2, setValue2 ] = useState('');

	return (
		<Form
			disabled={boolean('disabled', false)}
			onSubmit={action('onSubmit')}>
			<FormField
				name={text('name', 'field1')}
				label={text('label', 'Field 1')}
				value={value1}
				placeholder={text('placeholder', 'my first field..')}
				onChange={event => (setValue1(event.target.value), action('onField1Change')(event))} />
			<FormField
				name={text('name', 'field2')}
				label={text('label', 'Field 2')}
				value={value2}
				placeholder={text('placeholder', 'my second field..')}
				onChange={event => (setValue2(event.target.value), action('onField2Change')(event))} />
		</Form>
	);
};
