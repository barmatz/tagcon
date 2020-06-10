import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormField from './FormField';
import './TimestampFormField.scss';

function SetButton({ onClick }) {
	return (
		<button className="form__field--timestamp__button" onClick={onClick}>Set</button>
	);
}

SetButton.propTypes = {
	onClick: PropTypes.func
};

function TimestampFormField({ name, currentTime, startTime, endTime, valueFormat, onChange }) {
	const [ currentStartTime, setCurrentStartTime ] = useState(startTime)
			, [ currentEndTime, setCurrentEndTime ] = useState(endTime);

	function dispatchChange(startTime, endTime) {
		onChange && onChange({ target: { value: { startTime, endTime }}});
	}

	return (
		<div className="form__field form__field--timestamp">
			<FormField
				name={`${name}-current-time`}
				label="Current Time"
				value={currentTime}
				valueFormat={valueFormat}
				readOnly={true} />
			<FormField
				name={`${name}-start-time`}
				label="Start Time"
				value={currentStartTime}
				valueFormat={valueFormat}
				readOnly={true}
				button={
					<SetButton onClick={() => (setCurrentStartTime(currentTime), dispatchChange(currentTime, currentEndTime))} />
				} />
			<FormField
				name={`${name}-end-time`}
				label="End Time"
				value={currentEndTime}
				valueFormat={valueFormat}
				readOnly={true}
				button={
					<SetButton onClick={() => (setCurrentEndTime(currentTime), dispatchChange(currentStartTime, currentTime))} />
				} />
		</div>
	);
}

TimestampFormField.propTypes = {
	name: PropTypes.string.isRequired,
	currentTime: PropTypes.number.isRequired,
	startTime: PropTypes.number,
	endTime: PropTypes.number,
	valueFormat: PropTypes.func,
	onChange: PropTypes.func
};

TimestampFormField.defaultProps = {
	currentTime: 0,
	startTime: 0,
	endTime: 0
};

export default TimestampFormField;
