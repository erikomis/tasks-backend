import dotenv from 'dotenv';
import 'express-async-errors';
import express from 'express';
import './infra/sequelize/database';
import cors from 'cors';
import routerIndex from './routes';
import { resolve } from 'path';
import ErrorsApp from './erros/ErrorsApp';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(resolve(__dirname, '..', 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(cors());
app.use(routerIndex);

app.use((error, request, response, next) => {
  if (error instanceof ErrorsApp) {
    return response.status(error.statusCode).json({
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
app.listen(process.env.PORT || 3333, () => {
  console.log(`\n Escutando  na porta ${port}`);
});
