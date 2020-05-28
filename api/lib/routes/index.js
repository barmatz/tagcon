import express from 'express';

export default express.Router()
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
