import React from 'react';
import PropTypes from 'prop-types';
import { FormField } from 'components/form';
import TextTagFields from './TextTagFields';

function TopicTagFields({ tag, onChange, ...props }) {
	const { description } = tag
			,	handleChange = fieldName => ({ target: { value }}) => onChange && onChange({ ...tag, [fieldName]: value});

	return (
		<>
			<TextTagFields {...props} tag={tag} onChange={onChange}  />
			<FormField
				name="tag-topic"
				label="Topic Description"
				textarea={true}
				value={description}
				onChange={handleChange('description')} />
		</>
	);
}

TopicTagFields.propTypes = {
	tag: PropTypes.shape({
		description: PropTypes.string
	}),
	onChange: PropTypes.func
};

export default TopicTagFields;
