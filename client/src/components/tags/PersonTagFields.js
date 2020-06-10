import React from 'react';
import PropTypes from 'prop-types';
import { FormField, List } from 'components/form';
import TextTagFields from './TextTagFields';
import { resolveUrl } from 'utils/format';

function PersonTagFields({ tag, onChange, ...props }) {
	const { imageUrl } = tag
			, links = tag.links || []
			,	handleChange = (fieldName, formatter) => (
					({ target: { value }}) => {
						console.log({ fieldName, value, tag });
						return (
							onChange && onChange({ ...tag, [fieldName]: formatter ? formatter(value) : value })
						)
					}
				);

	return (
		<>
			<TextTagFields {...props} tag={tag} onChange={onChange}  />
			<div className="form__field--image-url">
				<FormField
					name="tag-image-url"
					label="Image URL"
					value={imageUrl}
					onChange={handleChange('imageUrl')} />
				<img src={imageUrl} alt="tag-image-url-preview" />
			</div>
			<div>
				<List
					name="tag-link"
					label="Add link"
					items={links}
					onChange={handleChange('links', links => links.map(url => ({ url })))}>
					{(url, index) => (
						<div key={`tag-list-item${index}`}>
							<a href={resolveUrl(url)} target="_blank" rel="noopener noreferrer">{url}</a>
						</div>
					)}
				</List>
			</div>
		</>
	);
}

PersonTagFields.propTypes = {
	tag: PropTypes.shape({
		imageUrl: PropTypes.string,
		links: PropTypes.arrayOf(PropTypes.shape({
			type: PropTypes.string,
			url: PropTypes.string.isRequired	
		}))
	}),
	onChange: PropTypes.func
};

export default PersonTagFields;
