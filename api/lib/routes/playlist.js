import express from 'express';

export default express.Router()
  .get('/', (req, res, next) => {
    res.data = {
      id: 1,
      items: [{
        id: 1
      }, {
        id: 2
      }]
    };
    next();
  });
