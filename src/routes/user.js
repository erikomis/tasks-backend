import { Router } from 'express';
import Users from '../services/Users';

const routerUser = new Router();
routerUser.get('/', Users.todosOsUsers);
routerUser.get('/:id', Users.userPorId);
routerUser.put('/:id', Users.atualizUser);
routerUser.delete('/:id', Users.deleteUser);

export default routerUser;
