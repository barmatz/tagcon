import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Player from 'components/player';
import './Playlist.scss';

class Playlist extends Component {
	static propTypes = {
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
		}))
	}

	static getDerivedStateFromProps({ items }, state) {
		return { ...state, currentItem: items && items[0] };
	}

	state = {
		currentItem: null
	}

	render() {
		const {
						props: {
							items
						},
						state: {
							currentItem
						}
					} = this;

		return (
			<div className="playlist">
				<div>Current videos in playlist: {items ? items.length : 0}</div>
				<div className="playlist__current-item">
					{currentItem
						?
							<div>
								<div>Current item {currentItem.id}</div>
								<Player className="playlist__player" id={currentItem.id} />
							</div>
						:
							<div>Current item not available</div>
					}
				</div>
			</div>
		);
	}
}


export default Playlist;
