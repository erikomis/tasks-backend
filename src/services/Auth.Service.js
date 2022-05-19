import jwt from 'jsonwebtoken';
import ErrorsApp from '../erros/ErrorsApp';
import { userRepository } from '../infra/sequelize/repositories/index';

export class AuthService {
  async login(email, password) {
    if (!email || !password) {
      throw new ErrorsApp('Crendencias invalidas', 401);
    }
    const user = await userRepository.findOneEmail(email);
    if (!user) {
      throw new ErrorsApp('Usuario não existe', 401);
    }
    if (!(await user.passwordIsValid(password))) {
      throw new ErrorsApp('Senha invalida', 401);
    }
    const { id, nome } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return { id, nome, email, token };
  }

  async register(value) {
    const novoUser = await userRepository.createUser(value);
    const { id, nome, email } = novoUser;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return { id, token, nome, email };
  }
}
