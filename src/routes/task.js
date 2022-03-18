import { Router } from 'express';
import Tasks from '../services/Tasks';

const routerTask = new Router();

routerTask.post('/', Tasks.criarTask);

export default routerTask;
