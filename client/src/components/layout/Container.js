import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Container.scss';

function Container({ className, children }) {
	return (
		<div className={classnames('container', className)}>{children}</div>
	);
}

Container.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired
};

export default Container;
