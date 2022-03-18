import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import Tasks from '../services/Tasks';

const routerTask = new Router();

routerTask.post('/', loginRequired, Tasks.criarTask);

export default routerTask;
