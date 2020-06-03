import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseTag from './BaseTag';

function TopicTag({ className, label, timestamp, displayTimestamp, description }) {
	return (
		<BaseTag
			className={classnames('tag--topic', className)}
			timestamp={timestamp}
			displayTimestamp={displayTimestamp}>
			{label}
			<p>{description}</p>
		</BaseTag>
	);
}

TopicTag.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	timestamp: PropTypes.string,
	displayTimestamp: PropTypes.bool,
	description: PropTypes.string
};

export default TopicTag;
