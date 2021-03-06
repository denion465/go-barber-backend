import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';

import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import rateLimiter from '@shared/middlewares/rateLimiter';
import routes from './routes';
import uploadConfig from '@config/upload';
import '@shared/infra/typeorm';
import AppError from '@shared/errors/AppError';
import '@shared/container';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    });
  }

  console.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
});

// eslint-disable-next-line no-console
app.listen(3333, () => console.log('👽 Server Started on port 3333!'));
