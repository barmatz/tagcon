import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function BaseTag({ className, children, timestamp, displayTimestamp }) {
	return (
		<div className={classnames('tag', className)}>
			{!displayTimestamp &&
				<div className="tag__tooltip">{timestamp}</div>
			}
			{children}
			<div className="tag__footer">
				{displayTimestamp && <small>({timestamp})</small>}
			</div>
		</div>
	);
}

BaseTag.propTypes = {
	className: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	timestamp: PropTypes.string,
	displayTimestamp: PropTypes.bool
};

export default BaseTag;
