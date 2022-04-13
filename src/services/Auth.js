import jwt from 'jsonwebtoken';
import User from '../models/User';

class Auth {
  async login(resquest, response) {
    const { email = '', password = '' } = resquest.body;
    if (!email || !password) {
      return response.status(401).json({
        Errors: ['Crendencias invalidas'],
      });
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return response.status(401).json({
        errors: ['Usuario não existe'],
      });
    }
    if (!(await user.passwordIsValid(password))) {
      return response.status(401).json({
        errors: ['Senha invalida'],
      });
    }
    const { id, nome } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.status(201).json({ nome, email, token });
  }

  async register(request, response) {
    try {
      const novoUser = await User.create(request.body);
      const { id, nome, email } = novoUser;

      const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      return response.json({ id, token, nome, email });
    } catch (error) {
      return response
        .status(400)
        .json({ errors: error.errors.map((err) => err.message) });
    }
  }
}

export default new Auth();
