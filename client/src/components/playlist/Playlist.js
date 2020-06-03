import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { playlistItemSelected } from 'actions/playlist';
import { Container } from 'components/layout';
import './Playlist.scss';

function Playlist({ items, selectedItem, onItemSelected }) {
	return (
		<div className="playlist">
			<Container>
				<div>Playlist ({items ? items.length : 0})</div>
				<ul className="playlist__list">{items && items.map((item, index) => (
					<li
						className={classnames('playlist__list__item', { 'playlist__list__item--selected': item.id === (selectedItem && selectedItem.id)})}
						key={`item${index}`}>
							<button onClick={() => onItemSelected(item)}>Item #{item.id}</button>
						</li>
				))}</ul>
			</Container>
		</div>
	);
}

Playlist.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
	})),
	selectedItem: PropTypes.shape({
		id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]).isRequired
	}),
	onItemSelected: PropTypes.func.isRequired
}
	
export default connect(
	({ playlist: { items, selectedItem }}) => ({
		items,
		selectedItem
	}),
	dispatch => ({
		onItemSelected: item => dispatch(playlistItemSelected(item))
	})
)(Playlist);
