import React from 'react';
import { Container, Row } from 'components/layout';
import Errors from 'components/errors';
import Playlist from 'components/playlist';
import Player from 'components/player';
import Tags from 'components/tags';
import './App.scss';

function App() {
  return (
    <div className="app">
      <Container className="app__title">
        <h1>TagCon</h1>
      </Container>
      <Errors />
      <Row>
        <Playlist />
        <Player />
        <Tags />
      </Row>
    </div>
  );
}

export default App;
