import User from '../models/User';

class Users {
  async userPorId(request, response) {
    try {
      const id = request.userId;
      const user = await User.findByPk(id);
      const { nome, email } = user;
      return response.json({ nome, email });
    } catch (error) {
      return response.json('erro');
    }
  }

  async atualizUser(request, response) {
    const id = request.userId;
    const { nome } = request.body;
    const user = await User.findByPk(id);
    User.update(user, nome);
    return response.json(user);
  }

  async deleteUser(request, response) {
    const id = request.userId;
    const user = await User.findByPk(id);
    await user.destroy();

    return response.json('Usuario deletado com sucesso');
  }
}

export default new Users();
