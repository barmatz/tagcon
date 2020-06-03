import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPlayer from 'react-player';
import { playerProgress } from 'actions/player';
import './Player.scss';

function Player({ url, onProgress }) {
	return (
		<div className={classnames('player', { 'player--no-video': !url })}>
			{url
				?
					<ReactPlayer
						url={url}
						controls={true}
						onProgress={onProgress} />
				:
					<div>No video</div>
			}
		</div>
	);
}

Player.propTypes = {
	id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
	url: PropTypes.string,
	onProgress: PropTypes.func.isRequired
}

export default connect(
	({ video: { id, url }}) => ({
		id,
		url
	}),
	dispatch => ({
		onProgress: ({ playedSeconds }) => dispatch(playerProgress(playedSeconds))
	})
)(Player);
