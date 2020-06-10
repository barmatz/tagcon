import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './FormField.scss';

const valuePropTypeOptions = [
				PropTypes.string,
				PropTypes.number,
				PropTypes.bool
			];

function isValueEmpty(value) {
	return typeof value === 'undefined' || value === null;
}

function resolveValue(value) {
	return isValueEmpty(value) ? '' : value;
}

function formatValue(value, format) {
	return format ? format(value) : value;
}

function renderInputField({ className, placeholder, value, valueFormat, readOnly, onChange, onFocus, onBlur }) {
	return (
		<input
			className={className}
			name={name}
			placeholder={placeholder}
			value={formatValue(resolveValue(value), valueFormat)}
			readOnly={readOnly || !onChange}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur} />
	);
}

renderInputField.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([ ...valuePropTypeOptions ]),
	valueFormat: PropTypes.func,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

function renderTextAreaField({ className, placeholder, value, readOnly, onChange, onFocus, onBlur }) {
	return (
		<textarea
			className={className}
			name={name}
			placeholder={placeholder}
			value={value}
			readOnly={readOnly || !onChange}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur} />
	);
}

renderTextAreaField.propTypes = {
	className: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

function renderSelectField({ className, name, placeholder, values, value, labelFormat, readOnly, onChange, onFocus, onBlur }) {	
	return (
		<select
			className={className}
			name={name}
			placeholder={placeholder}
			value={resolveValue(value)}
			readOnly={readOnly || !onChange}
			onChange={onChange}
			onFocus={onFocus}
			onBlur={onBlur}>
			{values.map((item, index) => renderSelectOptionField(item, labelFormat, `form-field-selection-option${index}`))}
		</select>
	);
}

renderSelectField.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	values: PropTypes.array.isRequired,
	value: PropTypes.oneOfType([ ...valuePropTypeOptions ]),
	labelFormat: PropTypes.func,
	readOnly: PropTypes.bool,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
}

function renderSelectOptionField(value, labelFormat, key) {
	let finalValue, label;

	if (typeof value === 'object') {
		finalValue = typeof value.value === 'undefined' ? value : value.value;
		label = typeof value.label === 'undefined' ? finalValue : value.label;
	} else {
		label = value;
	}

	return (
		<option key={key} value={resolveValue(finalValue)}>{formatValue(label, labelFormat)}</option>
	);
}

renderSelectOptionField.propTypes = {
	value: PropTypes.oneOfType([
		...valuePropTypeOptions,
		PropTypes.shape({
			value: PropTypes.oneOfType([ ...valuePropTypeOptions ]),
			label: PropTypes.string
		})
	]),
	labelFormat: PropTypes.func,
	key: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	])
};

function FormField({ className, name, label, placeholder, value, valueFormat, values, readOnly, textarea, button, onChange, onFocus, onBlur }) {
	const fieldProps = {
					className: 'form__field__field',
					name,
					placeholder,
					value,
					valueFormat,
					readOnly,
					onChange,
					onFocus,
					onBlur
				};

	return (
		<div className={classnames('form__field', className)}>
			<label className="form__field__wrapper">
				{label &&
					<span className="form__field__label">{label}</span>
				}
				{values
					?
						renderSelectField({ ...fieldProps, values })
					: (
							textarea
								?
									renderTextAreaField(fieldProps)
								:
									renderInputField(fieldProps)
						)
				}
				{button}
			</label>
		</div>
	);
}

FormField.propTypes = {
	className: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	placeholder: PropTypes.string,
	values: PropTypes.oneOfType([
		...valuePropTypeOptions,
		PropTypes.arrayOf(PropTypes.oneOfType([
			...valuePropTypeOptions,
			PropTypes.shape({
				value: PropTypes.oneOfType([ ...valuePropTypeOptions ]).isRequired,
				label: PropTypes.string
			})
		]))
	]),
	value: PropTypes.oneOfType([
		...valuePropTypeOptions
	]),
	valueFormat: PropTypes.func,
	readOnly: PropTypes.bool,
	textarea: PropTypes.bool,
	button: PropTypes.node,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func
};

FormField.defaultProps = {
	value: ''
};

export default FormField;
