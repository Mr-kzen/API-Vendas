import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import { pagination } from 'typeorm-pagination';
import { errors } from 'celebrate';

import uploadConfig from '@config/upload';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();
app.use(cors());

app.use(express.json());

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory)); //rsc para consumir as imagens de avatar!

//Rotas
import routes from './routes';

app.use(routes);
app.use(errors);

//midlewar para tratamento de Errors
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  } else {
    return res.status(500).json({
      status: 'error',
      message: 'Internal service error',
    });
  } //Quando o erro não for pela aplicação retorna um status 500 -> sem conhecimento do erro
});

//Porta do server
app.listen(3333, () => {
  console.log('Server started on port 3333');
});
