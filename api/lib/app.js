import createError from 'http-errors';
import express from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import indexRouter from './routes/index.js';

export default express()
  .set('views', join('.', 'views'))
  .set('view engine', 'jade')
  .use(logger('dev'))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(cookieParser())
  .use(cors())
  .use(express.static(join('.', 'public')))
  .use('/', indexRouter)
  .use((req, res, next) => next(createError(404)))
  .use((err, { app }, { locals, status, render }) => {
    locals.message = err.message;
    locals.error = app.get('env') === 'development' ? err : {};
    status(err.status || 500);
    render('error');
  });
