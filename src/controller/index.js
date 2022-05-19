import { AuthController } from './Auth.Controller';
import { UserController } from './Users.Controller';
import { TasksController } from './Tasks.Controller';

export const authController = new AuthController();
export const userController = new UserController();
export const tasksController = new TasksController();
