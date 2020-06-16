import express from 'express';
import playlist from './playlist.js';

export default express.Router()
  .use('/playlist', playlist)
  .get('/', (req, res, next) => {
    res.data = { message: 'TagCon API' };
    next();
  })
  .use((req, res) => {
    const { data, meta, error } = res
        , resData = { meta };

    if (error) {
      resData.error = error.messge || error.toString() || 'Unknown error';
      res.status(500);
    } else if (data) {
      resData.data = data;
      res.status(200);
    } else {
      res.status(404);
    }

    res.json(resData);
  });
