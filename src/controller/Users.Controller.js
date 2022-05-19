import { usersService } from '../services/index';

export class UserController {
  async userById(request, response) {
    const id = request.userId;
    const user = await usersService.userById(id);

    return response.status(200).json(user);
  }

  async updateUser(request, response) {
    const id = request.userId;
    const { nome } = request.body;
    const updateUser = await usersService.updateUser(id, nome);

    return response.status(200).json(updateUser);
  }

  async deleteUser(request, response) {
    const id = request.userId;
    await usersService.updateUser(id);
    response.status(201).json({ messsage: 'success' });
  }
}
