import { AuthService } from './Auth.Service';
import { UsersService } from './Users.Service';
import { TasksService } from './Tasks.Service';

export const authService = new AuthService();
export const usersService = new UsersService();
export const tasksService = new TasksService();
