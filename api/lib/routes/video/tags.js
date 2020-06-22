import express from 'express';
import Video from '../../db/models/Video.js';

export default express.Router()
  .get('/', async ({ params: { id }}, res, next) => {
    const video = await Video.findById(id, 'tags');

    if (video) {
      res.data = video.toClient();
    }

    next();
  })
  .post('/', async ({ body, params: { id }}, res, next) => {
    const video = await Video.findById(id, 'tags');

    console.log(body);

    video.tags = body;

    const updatedVideo = await video.save();

    if (updatedVideo) {
      res.data = updatedVideo.toClient();
    }

    next();
  });
