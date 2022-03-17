import User from '../models/User';

class Users {
  async todosOsUsers(request, response) {
    try {
      const users = await User.findAll();

      return response.json(users);
    } catch (error) {
      return response.json(error);
    }
  }
  async userPorId(request, response) {
    try {
      const { id } = request.params;

      const user = await User.findByPk(id);

      return response.json(user);
    } catch (error) {
      return response.json('erro');
    }
  }

  async atualizUser(request, response) {
    const { id } = request.params;

    const { nome } = request.body;

    const user = await User.findByPk(id);

    User.update(user, nome);

    return response.json(user);
  }

  async deleteUser(request, response) {
    const { id } = request.params;

    const user = await User.findByPk(id);

    await user.destroy();

    return response.json('Usuario deletado  com sucesso');
  }
}

export default new Users();
