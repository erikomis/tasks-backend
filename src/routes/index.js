import { Router } from 'express';
import routerAuth from './auth';
import routerUser from './user';

const routerIndex = Router();

routerIndex.use('/auth', routerAuth);
routerIndex.use('/users', routerUser);

export default routerIndex;
