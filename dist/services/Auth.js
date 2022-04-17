"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class Auth {
  async login(resquest, response) {
    const { email = '', password = '' } = resquest.body;
    if (!email || !password) {
      return response.status(401).json({
        Errors: ['Crendencias invalidas'],
      });
    }
    const user = await _User2.default.findOne({
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
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return response.status(201).json({ nome, email, token });
  }

  async register(request, response) {
    try {
      const novoUser = await _User2.default.create(request.body);
      const { id, nome, email } = novoUser;

      const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
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

exports. default = new Auth();
