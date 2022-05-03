import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import Tasks from '../services/Tasks';
const routerTask = new Router();
routerTask.post('/', loginRequired, Tasks.criarTask);
routerTask.get('/', loginRequired, Tasks.verTodasAsTasks);
routerTask.get('/:id', loginRequired, Tasks.taskById);

routerTask.put('/:id', loginRequired, Tasks.atualizarTaskById);
routerTask.delete('/:id', loginRequired, Tasks.deleteTaskByid);
routerTask.post('/search', loginRequired, Tasks.buscaPorNome);

export default routerTask;
