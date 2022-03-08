import express from 'express';
import ErrorsApp from './erros/ErrorsApp';
import cors from 'cors';
import router from './routes';

const app = express();

app.use(router);
app.use(express.json());
app.use(cors());

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

app.listen(3333, () => {
  console.log('server iniciado na porta 3333');
});
