import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseTag from './BaseTag';

function TextTag({ className, label, timestamp, displayTimestamp }) {
	return (
		<BaseTag
			className={classnames('tag--text', className)}
			timestamp={timestamp}
			displayTimestamp={displayTimestamp}>
			{label}
		</BaseTag>
	);
}

TextTag.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	timestamp: PropTypes.string,
	displayTimestamp: PropTypes.bool
};

export default TextTag;
