import React from 'react';
import { Container, Row } from 'components/layout';
import Errors from 'components/errors';
import Playlist from 'components/playlist';
import Player from 'components/player';
import Tags, { TagEditor } from 'components/tags';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Container className="app__title">
        <h1>TagCon</h1>
        <Errors />
        <TagEditor />
      </Container>
      <Row>
        <Playlist />
        <Player />
        <Tags />
      </Row>
    </div>
  );
}

export default App;
