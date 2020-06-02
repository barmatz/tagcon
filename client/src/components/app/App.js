import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Playlist from 'components/playlist';
import './App.scss';

function App({ errors, playlist }) {
  const videos = playlist ? playlist.videos : null;

  return (
    <div className="app">
      <div className="app__errors">
        {errors && errors.map((err, index) => (
          <div key={`error${index}`}>{err.toString()}</div>
        ))}
      </div>
      <h1>Welcome to TagCon!</h1>
      <Playlist items={videos} />
    </div>
  );
}

App.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.shape({
    toString: PropTypes.func.isRequired
  })),
	playlist: PropTypes.shape({
    videos: PropTypes.array
  })
};

export default connect(
	({ app: { errors, playlist }}) => ({
    errors,
		playlist
	})
)(App);
