import { Router } from 'express';
import routerAuth from './auth';

const routerIndex = Router();

routerIndex.use('/auth', routerAuth);

export default routerIndex;
