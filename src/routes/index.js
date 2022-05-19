import { Router } from 'express';
import { routerAuth } from './auth';
import { routerTask } from './task';
import { routerUser } from './user';

const routerIndex = Router();

routerIndex.use('/auth', routerAuth);
routerIndex.use('/users', routerUser);
routerIndex.use('/tasks', routerTask);

export default routerIndex;
