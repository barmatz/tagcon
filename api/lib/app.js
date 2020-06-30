import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import indexRouter from './routes/index.js';

function getLogger() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return logger('common');
    case 'test':
      return (req, res, next) => next();
    default:
      return logger('dev');
  }
}

export default express()
  .set('views', join('.', 'views'))
  .set('view engine', 'jade')
  .use(getLogger())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(cors())
  .use(express.static(join('.', 'public')))
  .use('/ping', (req, res) => res.send('pong'))
  .use('/api', indexRouter)
  .use((req, res, next) => next(createError(404)))
  .use((err, { app }, { locals, status, render }) => {
    locals.message = err.message;
    locals.error = app.get('env') === 'development' ? err : {};
    status(err.status || 500);
    render('error');
  });
