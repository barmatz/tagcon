import express from 'express';

const mockData = {
  1: {
    id: 1
    , items: [{
      id: 1
    }, {
      id: 2
    }]
  }
  , 2: {
    id: 2
    , items: [{
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
    const [ data ] = Object.values(mockData);

    res.data = data;
    next();
  })
  .get('/:id', ({ params: { id }}, res, next) => {
    res.data = mockData[id];
    next();
  });
