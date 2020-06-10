import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTag } from 'actions/tags';
import Form from 'components/form';
import { TEXT_TAG, PERSON_TAG, TOPIC_TAG } from './Tag';
import TextTagFields from './TextTagFields';
import TopicTagFields from './TopicTagFields';
import PersonTagFields from './PersonTagFields';
import './TagEditor.scss';

const getInitTag = () => ({});

const getTagPrintableName = tag => (
	tag ? (tag.label || 'Unnamed tag') : 'Unknown tag'
);

export const TagEditor = ({ tagTypes, currentTime, currentTag, savingTag, tagSaved, onSaveTag }) => {
	const [ openEditor, setOpenEditor ] = useState(false)
			, [ tag, setTag ] = useState(getInitTag());

	function resetForm() {
		setTag(getInitTag());
	}

	function handleFormChange(tag) {
		console.log({ tag });
		setTag({ ...tag });
	}

	function renderFields() {
		const { type } = tag
				, fieldProps = {
						tagTypes: [ ...(tagTypes || []) ],
						currentTime,
						tag,
						onChange: handleFormChange
					};

		switch (type) {
			case TOPIC_TAG:
				return (
					<TopicTagFields {...fieldProps} />
				);
			case PERSON_TAG:
				return (
					<PersonTagFields {...fieldProps} />
				);
			case TEXT_TAG:
			default:
				return (
					<TextTagFields {...fieldProps} />
				);
		}
	}

	return (
		<div className="tag-editor">
			<div className="tag-editor__actions">
				{!openEditor &&
					<button
						disabled={savingTag}
						onClick={() => setOpenEditor(true)}>
						Create Tag
					</button>
				}
				{openEditor &&
					<>
						<button
							disabled={savingTag}
							onClick={() => (resetForm(), setOpenEditor(false))}>
							Delete Tag
						</button>
						<button
							disabled={savingTag}
							onClick={() => onSaveTag(tag)}>
							Save Tag
						</button>
					</>
				}
				{savingTag &&
					<div>Saving tag {getTagPrintableName(currentTag)}...</div>
				}
				{tagSaved &&
					<div>Tag {getTagPrintableName(currentTag)} saved!</div>
				}
			</div>
			{openEditor &&
				<Form disabled={savingTag} disableSubmitButton={true}>
					{renderFields()}
				</Form>
			}
		</div>
	);
};

TagEditor.propTypes = {
	tagTypes: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.any 
	})),
	currentTime: PropTypes.number,
	currentTag: PropTypes.object,
	savingTag: PropTypes.bool,
	tagSaved: PropTypes.bool,
	onSaveTag: PropTypes.func.isRequired
};

export default connect(
	({ tagEditor: { tagTypes, currentTag, savingTag, tagSaved }, player: { currentTime }}) => ({
		tagTypes,
		currentTime,
		currentTag,
		savingTag,
		tagSaved
	}),
	dispatch => ({
		onSaveTag: tag => dispatch(saveTag(tag))
	})
)(TagEditor);
