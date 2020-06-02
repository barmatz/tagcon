import React from 'react';
import PropTypes from 'prop-types';
import { secondsToTimestamp } from 'utils/format';

function PlayerTags({ tags, currentTime }) {
	return (
		<div className="player__tags">
			Current Tags:			
			<ul className="player__tags__list">
				{tags
					.filter(({ timestamp: { start, end }}) => currentTime >= start && currentTime < end)
					.map(({ label, timestamp: { start, end }}, index) => (
						<li className="player__tags__list__item" key={`current-tag${index}`}>{label} ({secondsToTimestamp(start)}/{secondsToTimestamp(end)})</li>
					))}
			</ul>
			All Tags:
			<ul className="player__tags__list">
				{tags
					.map(({ label, timestamp: { start, end }}, index) => (
						<li className="player__tags__list__item" key={`tag${index}`}>{label} ({secondsToTimestamp(start)}/{secondsToTimestamp(end)})</li>
					))}
			</ul>
		</div>
	);
}

PlayerTags.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		timestamp: PropTypes.shape({
			start: PropTypes.number.isRequired,
			end: PropTypes.number.isRequired
		})
	})),
	currentTime: PropTypes.number
};

export default PlayerTags;
