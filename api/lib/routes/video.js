import express from 'express';
import Video from '../db/models/Video.js';
// import tags from './video/tags.js';

export default express.Router()
  .get('/', async (req, res, next) => {
    const videos = await Video.find({});

    res.data = videos.map(video => video.toClient());
    next();
  })
  .post('/', async ({ body }, res, next) => {
    const video = await Video.create(body);

    res.data = video.toClient();
    next();
  })
  .get('/:id', async ({ params: { id }}, res, next) => {
    const video = await Video.findById(id);

    if (video) {
      res.data = video.toClient();
    }

    next();
  })
  .put('/:id', async ({ body, params: { id }}, res, next) => {
    const video = await Video.findById(id);

    Object.keys(body).forEach(key => {
      video[key] = body[key];
    });

    const updatedVideo = await video.save();

    res.data = updatedVideo.toClient();

    next();
  })
  .delete('/:id', async ({ params: { id }}, res, next) => {
    const { deletedCount } = await Video.remove({ _id: id });

    res.data = deletedCount;

    next();
  });
  // .all('/:id/tags', tags);
