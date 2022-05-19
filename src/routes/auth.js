import { authController } from '../controller/index';
import { Router } from 'express';

export const routerAuth = new Router();
routerAuth.post('/login/', authController.login);
routerAuth.post('/register/', authController.register);
