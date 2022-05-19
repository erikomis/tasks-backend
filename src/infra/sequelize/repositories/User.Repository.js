import ErrorsApp from '../../../erros/ErrorsApp';
import User from '../models/User';

export class UserRepository extends User {
  async findOneEmail(email) {
    try {
      const user = await User.findOne({
        where: { email },
      });
      return user;
    } catch (error) {
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }
  async createUser(user) {
    try {
      const createUser = await User.create(user);
      return createUser;
    } catch (error) {
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }

  async findById(id) {
    const user = await User.findByPk(id);
    return user;
  }
}
