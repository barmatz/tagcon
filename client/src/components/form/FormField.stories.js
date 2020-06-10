import React, { useState } from 'react';
import { text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import FormField from './FormField';

export default {
	component: FormField,
	title: 'components/form/FormField'
}

export const basic = () => {
	const [ value, setValue ] = useState('');
	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value={value}
			onChange={event => (setValue(event.target.value), action('onChange')(event))}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}

export const withValues = () => {
	const [ value, setValue ] = useState('');
	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value={value}
			values={object('values', [{
				value: 1,
				label: 'One'
			}, {
				value: 2,
				label: 'Two'
			}, {
				value: 3,
				label: 'Three'
			}])}
			onChange={event => (setValue(event.target.value), action('onChange')(event))}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}

export const withValueFormat = () => {
	const [ value, setValue ] = useState('');
	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value={value}
			valueFormat={value => value.toUpperCase()}
			onChange={event => (setValue(event.target.value), action('onChange')(event))}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}

export const readOnly = () => {	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value="my value"
			readOnly={true}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}

export const textarea = () => {
	const [ value, setValue ] = useState('');
	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value={value}
			textarea={true}
			onChange={event => (setValue(event.target.value), action('onChange')(event))}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}

export const withButton = () => {
	const [ value, setValue ] = useState('');
	
	return (
		<FormField
			name={text('name', 'myField')}
			label={text('label', 'My Field')}
			placeholder={text('placeholder', 'My Field..')}
			value={value}
			button={<button onClick={action('onClick')}>My Button</button>}
			onChange={event => (setValue(event.target.value), action('onChange')(event))}
			onFocus={action('onFocus')}
			onBlur={action('onBlur')} />
	);
}
