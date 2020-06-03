import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'components/layout';
import { secondsToTimestamp } from 'utils/format';
import './Tags.scss';

function Tags({ tags, currentTime }) {
	return (
		<div className="tags">
			<Container>
				{tags
					?	
						<div>
							Current Tags:			
							<ul className="tags__list tags__list--current">
								{tags
									.filter(({ timestamp: { start, end }}) => currentTime >= start && currentTime < end)
									.map(({ label, timestamp: { start, end }}, index) => (
										<li className="player__tags__list__item" key={`current-tag${index}`}>{label} ({secondsToTimestamp(start)}/{secondsToTimestamp(end)})</li>
									))}
							</ul>
							All Tags:
							<ul className="tags__list">
								{tags
									.map(({ label, timestamp: { start, end }}, index) => (
										<li className="player__tags__list__item" key={`tag${index}`}>{label} ({secondsToTimestamp(start)}/{secondsToTimestamp(end)})</li>
									))}
							</ul>
						</div>
					:
						<div>This video has no tags</div>
				}
			</Container>
		</div>
	);
}

Tags.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string.isRequired,
		timestamp: PropTypes.shape({
			start: PropTypes.number.isRequired,
			end: PropTypes.number.isRequired
		})
	})),
	currentTime: PropTypes.number
};

export default connect(
	({ video, player: { currentTime } }) => ({
		tags: video && video.tags,
		currentTime
	})
)(Tags);
