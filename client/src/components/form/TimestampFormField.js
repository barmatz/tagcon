import React, { Component } from 'react';
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

class TimstampFormField extends Component {
	static propTypes = {
		name: PropTypes.string.isRequired,
		currentTime: PropTypes.number.isRequired,
		startTime: PropTypes.number,
		endTime: PropTypes.number,
		valueFormat: PropTypes.func,
		onChange: PropTypes.func
	}

	static defaultProps = {
		currentTime: 0,
		startTime: 0,
		endTime: 0
	}

	constructor(props) {
		super(props);

		this.handleSetStartTime = this.handleSetStartTime.bind(this);
		this.handleSetEndTime = this.handleSetEndTime.bind(this);
		this.dispatchChangeEvent = this.dispatchChangeEvent.bind(this);
	}

	dispatchChangeEvent(startTime, endTime) {
		const { onChange } = this.props;

		onChange && onChange({ target: { value: { startTime, endTime }}});
	}

	handleSetStartTime() {
		const {
					props: {
						currentTime,
						endTime
					},
					dispatchChangeEvent
				} = this;

		dispatchChangeEvent(currentTime, endTime);
	}

	handleSetEndTime() {
		const {
					props: {
						currentTime,
						startTime
					},
					dispatchChangeEvent
				} = this;

		dispatchChangeEvent(startTime, currentTime);
	}

	render() {
		const {
						props: {
							name,
							currentTime,
							startTime,
							endTime,
							valueFormat
						},
						handleSetStartTime,
						handleSetEndTime
					} = this;

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
					value={startTime}
					valueFormat={valueFormat}
					readOnly={true}
					button={
						<SetButton onClick={handleSetStartTime} />
					} />
				<FormField
					name={`${name}-end-time`}
					label="End Time"
					value={endTime}
					valueFormat={valueFormat}
					readOnly={true}
					button={
						<SetButton onClick={handleSetEndTime} />
					} />
			</div>
		);
	}
}

export default TimstampFormField;
