import Auth from '../services/Auth';
import { Router } from 'express';

const routerAuth = new Router();

routerAuth.post('/login/', Auth.login);
routerAuth.post('/register/', Auth.register);

export default routerAuth;
