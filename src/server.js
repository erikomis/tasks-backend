import dotenv from 'dotenv';
import express from 'express';
import './database';
import cors from 'cors';
import routerIndex from './routes';
import ErrorsApp from './erros/ErrorsApp';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routerIndex);

app.use((error, request, response, next) => {
  if (error instanceof ErrorsApp) {
    return response.status(error.status).json({
      status: 'error',
      message: error.message,
    });
  }
  return response.status(500).json({
    status: 'error',
    message: 'Internal error',
  });
});

const port = 3333;
app.listen(port, () => {
  console.log();
  console.log(`Escutando  na porta ${port}`);
  console.log(`Escutando  na porta ${port}`);
});
