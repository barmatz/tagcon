import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import BaseTag from './BaseTag';
import './PersonTag.scss';

function PersonTag({ className, label, timestamp, displayTimestamp, image, links }) {
	return (
		<BaseTag
			className={classnames('tag--person', className)}
			timestamp={timestamp}
			displayTimestamp={displayTimestamp}>
			<img className="tag--person__image" src={image} alt={label} />
			<div>
				{label}
				{links &&
					<ul className="tag--person__links">
						{links.map(({ type, url }, index) => (
							<li key={`link${index}`}>
								<a href={url} target="_blank" rel="noopener noreferrer">{type}</a>
							</li>
						))}	
					</ul>
				}
			</div>
		</BaseTag>
	);
}

PersonTag.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string.isRequired,
	timestamp: PropTypes.string,
	displayTimestamp: PropTypes.bool,
	image: PropTypes.string,
	links: PropTypes.arrayOf(PropTypes.shape({
		type: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired	
	}))
};

export default PersonTag;
