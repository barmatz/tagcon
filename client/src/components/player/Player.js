import React, {Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPlayer from 'react-player';
import { fetchVideoById } from 'actions/player'
import PlayerTags from './PlayerTags';
import './Player.scss';

class Player extends Component {
	static propTypes = {
		className: PropTypes.string,
		id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
		url: PropTypes.string,
		tags: PropTypes.array,
		fetchVideoByIdHandler: PropTypes.func.isRequired
	}

	state = {
		currentTime: 0
	}

	constructor(props) {
		super(props);

		this.fetchVideo = this.fetchVideo.bind(this);
		this.handlePlayerProgress = this.handlePlayerProgress.bind(this);
	}

	componentDidMount() {
		this.fetchVideo();
	}

	componentDidUpdate(prevProps) {
		if (prevProps && prevProps.id !== this.props.id) {
			this.fetchVideo();
		}
	}

	fetchVideo() {
		const {
			props: {
				id,
				fetchVideoByIdHandler
			}
		} = this;

		if (id !== null) {
			fetchVideoByIdHandler(id);		
		}
	}

	handlePlayerProgress({ playedSeconds }) {
		this.setState({ currentTime: playedSeconds });
	}

	render() {
		const { 
						props: {
							className,
							url,
							tags
						},
						state: {
							currentTime
						},
						handlePlayerProgress
					} = this;

		return (
			<div className={classnames('player', className)}>
				{url
					?
						<div>
							<ReactPlayer
								className="player__player"
								url={url}
								controls={true}
								onProgress={handlePlayerProgress} />
							<div className="player__tags">
								{tags
									?
										<PlayerTags tags={tags} currentTime={currentTime} />
									:
										<div>This video has no tags</div>
								}
							</div>
						</div>
					:
						<div>No video</div>
				}
			</div>
		);
	}
}

export default connect(
	({ player: { video }}) => ({
		...video
	}),
	dispatch => ({
		fetchVideoByIdHandler: id => dispatch(fetchVideoById(id))
	})
)(Player);
