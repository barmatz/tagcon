import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import apiMocker from 'connect-api-mocker';

const port = 3001;

console.log(`Running mock API server on port ${port}`);

express()
	.use(logger('dev'))
	.use(cors())
	.use('/api', apiMocker('mock-api'))
	.listen(port);