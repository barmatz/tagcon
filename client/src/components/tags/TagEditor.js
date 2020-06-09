import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTag } from 'actions/tags';
import Form from 'components/form';
import TextTagFields from './TextTagFields';
import TopicTagFields from './TopicTagFields';
import PersonTagFields from './PersonTagFields';
import './TagEditor.scss';

const TAG_TYPE_TOPIC = 'topic'
		, TAG_TYPE_PERSON = 'person'
		, TAG_TYPE_TEXT = 'text';

function getInitTag() {
	return {};
}

function getTagPrintableName(tag) {
	return tag ? (tag.label || 'Unnamed tag') : 'Unknown tag';
}

class TagEditor extends Component {
	static propTypes = {
		tagTypes: PropTypes.array,
		playerCurrentTime: PropTypes.number,
		currentTag: PropTypes.object,
		savingTag: PropTypes.bool,
		tagSaved: PropTypes.bool,
		onSaveTag: PropTypes.func.isRequired
	}

	state = {
		openEditor: false,
		tag: getInitTag()
	}

	constructor(props) {
		super(props);

		this.resetForm = this.resetForm.bind(this);
		this.handleOpenEditorClick = this.handleOpenEditorClick.bind(this);
		this.handleDeleteTagClick = this.handleDeleteTagClick.bind(this);
		this.handleSaveTagClick = this.handleSaveTagClick.bind(this);
		this.handleFormChange = this.handleFormChange.bind(this);
		this.renderFields = this.renderFields.bind(this);
	}

	static getDerivedStateFromProps({ tagTypes }, state) {
		const nextState = { ...state };
		
		if (tagTypes && state.tagType === null) {
			nextState.tagType = tagTypes[0].value;
		}

		return nextState;
	}

	resetForm() {
		this.setState({
			tag: getInitTag()
		});
	}

	handleOpenEditorClick() {
		this.setState({ openEditor: true });
	}

	handleDeleteTagClick() {
		this.resetForm();
		this.setState({ openEditor: false });
	}

	handleSaveTagClick() {
		this.props.onSaveTag(this.state.tag);
	}

	handleFormChange(tag) {
		this.setState({ tag });
	}

	renderFields() {
		const {
					props: {
						tagTypes,
						playerCurrentTime
					},
					state: {
						tag
					},
					handleFormChange
				} = this
				, fieldProps = {
					tagTypes: [ ...(tagTypes || []) ],
					currentTime: playerCurrentTime,
					tag,
					onChange: handleFormChange
				};

		switch (tag.type) {
			case TAG_TYPE_TOPIC:
				return (
					<TopicTagFields {...fieldProps} />
				);
			case TAG_TYPE_PERSON:
				return (
					<PersonTagFields {...fieldProps} />
				);
			case TAG_TYPE_TEXT:
			default:
				return (
					<TextTagFields {...fieldProps} />
				);
		}
	}

	render() {
		const {
						props: {
							savingTag,
							tagSaved,
							currentTag
						},
						state: {
							openEditor
						},
						handleOpenEditorClick,
						handleDeleteTagClick,
						handleSaveTagClick,
						renderFields
					} = this;

		return (
			<div className="tag-editor">
				<div className="tag-editor__actions">
					{!openEditor &&
						<button onClick={handleOpenEditorClick} disabled={savingTag}>Create Tag</button>
					}
					{openEditor &&
						<>
							<button onClick={handleDeleteTagClick} disabled={savingTag}>Delete Tag</button>
							<button onClick={handleSaveTagClick} disabled={savingTag}>Save Tag</button>
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
					<Form disabled={savingTag}>{renderFields()}</Form>
				}
			</div>
		);
	}
}

export default connect(
	({ tagEditor: { tagTypes, currentTag, savingTag, tagSaved }, player: { currentTime }}) => ({
		tagTypes,
		playerCurrentTime: currentTime,
		currentTag,
		savingTag,
		tagSaved
	}),
	dispatch => ({
		onSaveTag: tag => dispatch(saveTag(tag))
	})
)(TagEditor);
