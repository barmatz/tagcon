import React from 'react';
import PropTypes from 'prop-types';
import { secondsToTimestamp } from 'utils/format';
import TextTag from './TextTag';
import PersonTag from './PersonTag';
import TopicTag from './TopicTag';
import './Tag.scss';

const TEXT_TAG = 'text'
		, PERSON_TAG = 'person'
		, TOPIC_TAG = 'topic';

function Tag(props) {
	const { label, timestamp: { start, end }} = props
			, timestamp = `${secondsToTimestamp(start)} / ${secondsToTimestamp(end)}`;

	switch (props.type) {
		case TOPIC_TAG:
			return <TopicTag {...props} timestamp={timestamp} label={label} />
		case PERSON_TAG:
			return <PersonTag {...props} timestamp={timestamp} label={label} />
		case TEXT_TAG:
		default:
			return <TextTag {...props} timestamp={timestamp} label={label} />
	}
}

Tag.propTypes = {
	type: PropTypes.string,
	label: PropTypes.string.isRequired,
	timestamp: PropTypes.shape({
		start: PropTypes.number,
		end: PropTypes.number
	}),
	displayTimestamp: PropTypes.bool
};

export default Tag;
