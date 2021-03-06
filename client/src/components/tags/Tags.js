import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container } from 'components/layout';
import Tag from './Tag';
import './Tags.scss';

export const Tags = ({ tags, currentTime }) => (
	<div className="tags">
		<Container>
			{tags
				?	
					<>
						Current Tags:			
						<div className="tags__list tags__list--current">
							{tags
								.filter(({ timestamp: { start, end }}) => currentTime >= start && currentTime < end)
								.map((tag, index) => (
									<Tag
										key={`current-tag${index}`}
										className="tags__list__item"
										{...tag} />
								))}
						</div>
						All Tags:
						<div className="tags__list">
							{tags
								.map((tag, index) => (
									<Tag
										key={`tag${index}`}
										className="tags__list__item"
										{...tag}
										displayTimestamp={true} />
								))}
						</div>
					</>
				:
					<>This video has no tags</>
			}
		</Container>
	</div>
);

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
