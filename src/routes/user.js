import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import Users from '../services/Users';

const routerUser = new Router();
routerUser.get('/:id', loginRequired, Users.userPorId);
routerUser.put('/:id', loginRequired, Users.atualizUser);
routerUser.delete('/:id', loginRequired, Users.deleteUser);

export default routerUser;
