import React from 'react';
import PropTypes from 'prop-types';
import { secondsToTimestamp } from 'utils/format';
import './Tag.scss';

function Tag({ label, start, end, displayTimestamp, labelMaxLength }) {
	const timestamp = `${secondsToTimestamp(start)} / ${secondsToTimestamp(end)}`
			, formattedLabel = typeof labelMaxLength === 'undefined' ? label : `${label.substring(0, labelMaxLength)}...`;

	return (
		<div className="tag">
			{!displayTimestamp &&
				<div className="tag__tooltip">{timestamp}</div>
			}
			{formattedLabel} {displayTimestamp && <small>({timestamp})</small>}
		</div>
	);
}

Tag.propTypes = {
	label: PropTypes.string.isRequired,
	start: PropTypes.number,
	end: PropTypes.number,
	displayTimestamp: PropTypes.bool,
	labelMaxLength: PropTypes.number
};

export default Tag;
