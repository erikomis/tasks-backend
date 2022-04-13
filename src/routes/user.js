import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import Users from '../services/Users';

const routerUser = new Router();
routerUser.get('/', loginRequired, Users.userPorId);
routerUser.put('/', loginRequired, Users.atualizUser);
routerUser.delete('/', loginRequired, Users.deleteUser);

export default routerUser;
