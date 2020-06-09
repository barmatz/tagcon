import React from 'react';
import PropTypes from 'prop-types';
import { FormField, TimestampFormField } from 'components/form';
import { secondsToTimestamp } from 'utils/format';

function resolveTimeValue(value) {
	return typeof value === 'number' ? value : parseInt(value);
}

function TextTagFields({ tagTypes, currentTime, tag, onChange }) {
	const {
					type,
					label,
					timestamp
				} = tag,
				handleChange = fieldName => ({ target: { value }}) => onChange && onChange({ ...tag, [fieldName]: value});

	return (
		<>
			<FormField
				name="tag-type"
				label="Tag Type"
				value={type}
				values={[ ...(tagTypes || []) ]}
				onChange={handleChange('type')} />
			<FormField
				name="tag-label"
				label="Tag Label"
				value={label}
				onChange={handleChange('label')} />
			<TimestampFormField
				name="tag-timstamp"
				currentTime={resolveTimeValue(currentTime)}
				startTime={resolveTimeValue(timestamp && timestamp.startTime)}
				endTime={resolveTimeValue(timestamp && timestamp.endTime)}
				valueFormat={secondsToTimestamp}
				onChange={handleChange('timestamp')} />
		</>
	);
}

TextTagFields.propTypes = {
	tagTypes: PropTypes.array,
	currentTime: PropTypes.number,
	tag: PropTypes.shape({
		type: PropTypes.string,
		label: PropTypes.string,
		timestamp: PropTypes.shape({
			startTime: PropTypes.number.isRequried,
			endTime: PropTypes.number.isRequried
		})
	}),
	onChange: PropTypes.func
};

TextTagFields.defaultProps = {
	tagTypes: [],
	tag: {
		type: '',
		name: '',
		currentTime: 0,
		timestamp: {
			startTime: 0,
			endTime: 0
		}
	}
};

export default TextTagFields;
