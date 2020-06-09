import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPlayer from 'react-player';
import { playerSeek } from 'actions/player';
import './Player.scss';

function Player({ url, lockPlayback, onProgress, onSeek }) {
	return (
		<div className={classnames('player', { 'player--no-video': !url })}>
			{url
				?
					<ReactPlayer
						url={url}
						controls={true}
						playing={typeof lockPlayback !== 'undefined' ? !lockPlayback : undefined}
						onProgress={onProgress}
						onSeek={onSeek} />
				:
					<>No video</>
			}
		</div>
	);
}

Player.propTypes = {
	url: PropTypes.string,
	lockPlayback: PropTypes.bool,
	onProgress: PropTypes.func.isRequired,
	onSeek: PropTypes.func
}

export default connect(
	({ video: { id, url }, player: { lockPlayback }}) => ({
		id,
		url,
		lockPlayback
	}),
	dispatch => ({
		onProgress: ({ playedSeconds }) => dispatch(playerSeek(playedSeconds)),
		onSeek: ({ seconds }) => dispatch(playerSeek(seconds))
	})
)(Player);
