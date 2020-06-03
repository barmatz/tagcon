import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Row.scss';

function Row({ className, children }) {
	return (
		<div className={classnames('row', className)}>{children}</div>
	);
}

Row.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Row;
