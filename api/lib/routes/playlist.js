import express from 'express';
import Playlist from '../db/models/playlist.js';

export default express.Router()
  .get('/', async (req, res, next) => {
    const playlists = await Playlist.find({});

    res.data = playlists.map(playlist => playlist.toClient());
    next();
  })
  .post('/', async ({ body }, res, next) => {
    const playlist = await Playlist.create(body);

    res.data = playlist.toClient();
    next();
  })
  .get('/:id', async ({ params: { id }}, res, next) => {
    const playlist = await Playlist.findById(id);

    if (playlist) {
      res.data = playlist.toClient();
    }

    next();
  })
  .put('/:id', async ({ body, params: { id }}, res, next) => {
    const playlist = await Playlist.findById(id);

    Object.keys(body).forEach(key => {
      playlist[key] = body[key];
    });

    const updatedPlaylist = await playlist.save();

    res.data = updatedPlaylist.toClient();

    next();
  })
  .delete('/:id', async ({ params: { id }}, res, next) => {
    const { deletedCount } = await Playlist.remove({ _id: id });

    res.data = deletedCount;

    next();
  });
