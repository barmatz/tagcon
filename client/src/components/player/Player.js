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

	constructor(props) {
		super(props);

		this.fetchVideo = this.fetchVideo.bind(this);
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

	render() {
		const { 
						props: {
							className,
							url,
							tags
						}
					} = this;

		return (
			<div className={classnames('player', className)}>
				{url
					?
						<div>
							<ReactPlayer className="player__player" url={url} controls={true} />
							<div className="player__tags">
								{tags
									?
										<PlayerTags tags={tags} />
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
