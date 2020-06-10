import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Form.scss';

function Form({ className, disabled, submitButtonLabel, onSubmit, disableSubmitButton, children }) {
	return (
		<form
			className={classnames('form', className)}
			onSubmit={event => (event.preventDefault(), onSubmit && onSubmit())}>
			<fieldset disabled={disabled}>
				{children}
				{!disableSubmitButton &&
					<button type="submit">{submitButtonLabel}</button>
				}
			</fieldset>
		</form>
	);
}

Form.propTypes = {
	className: PropTypes.string,
	disabled: PropTypes.bool,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	disableSubmitButton: PropTypes.bool,
	submitButtonLabel: PropTypes.string,
	onSubmit: PropTypes.func
};

Form.defaultProps = {
	submitButtonLabel: 'Submit'
};

export default Form;
