import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Form.scss';

function Form({ className, disabled, onSubmit, children }) {
	return (
		<form
			className={classnames('form', className)}
			onSubmit={event => (event.preventDefault(), onSubmit && onSubmit())}>
			<fieldset disabled={disabled}>{children}</fieldset>
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
	onSubmit: PropTypes.func
};

export default Form;
