import { Router } from 'express';
import loginRequired from '../middleware/loginRequired';
import { userController } from '../controller/index';

export const routerUser = new Router();
routerUser.get('/', loginRequired, userController.userById);
routerUser.put('/', loginRequired, userController.updateUser);
routerUser.delete('/', loginRequired, userController.deleteUser);
