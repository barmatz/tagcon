import express from 'express';

const mockData = {
        '1': {
          id: 1,
          items: [{
            id: 1
          }, {
            id: 2
          }]
        },
        '2': {
          id: 2,
          items: [{
            id: 1
          }, {
            id: 2
          }]
        }
      };

export default express.Router()
  .use((req, res, next) => {
    next();
  })
  .get('/', (req, res, next) => {
    res.data = Object.values(mockData)[0];
    next();
  })
  .get('/:id', ({ params: { id }}, res, next) => {
    res.data = mockData[id];
    next();
  });
