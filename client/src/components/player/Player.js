import React, {Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPlayer from 'react-player';
import { playerProgress } from 'actions/player';
import './Player.scss';

class Player extends Component {
	static propTypes = {
		id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
		url: PropTypes.string,
		onProgress: PropTypes.func.isRequired
	}

	state = {
		currentTime: 0
	}

	constructor(props) {
		super(props);

		this.handlePlayerProgress = this.handlePlayerProgress.bind(this);
	}

	handlePlayerProgress({ playedSeconds }) {
		this.props.onProgress(playedSeconds);
	}

	render() {
		const { 
						props: {
							url
						},
						handlePlayerProgress
					} = this;

		return (
			<div className={classnames('player', { 'player--no-video': !url })}>
				{url
					?
						<ReactPlayer
							url={url}
							controls={true}
							onProgress={handlePlayerProgress} />
					:
						<div>No video</div>
				}
			</div>
		);
	}
}

export default connect(
	({ video: { id, url }}) => ({
		id,
		url
	}),
	dispatch => ({
		onProgress: currentTime => dispatch(playerProgress(currentTime))
	})
)(Player);
