import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import { tasksController } from '../controller/index';

export const routerTask = new Router();

routerTask.post('/', loginRequired, tasksController.createTask);
routerTask.get('/', loginRequired, tasksController.findAllTasks);
routerTask.get('/:id', loginRequired, tasksController.findTaskById);

routerTask.put('/:id', loginRequired, tasksController.updateTask);
routerTask.delete('/:id', loginRequired, tasksController.deleteTask);
routerTask.post('/search', loginRequired, tasksController.findByNome);
