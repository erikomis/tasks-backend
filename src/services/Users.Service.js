import { userRepository } from '../infra/sequelize/repositories/index';

export class UsersService {
  async userById(id) {
    const user = await userRepository.findById(id);
    const { nome, email } = user;
    return { nome, email };
  }
  async updateUser(id, nome) {
    const user = await userRepository.findById(id);
    await userRepository.update(user, nome);
    return user;
  }
  async deleteUser(id) {
    const user = await userRepository.findById(id);
    await user.destroy();
    return true;
  }
}
