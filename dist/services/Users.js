"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

class Users {
  async userPorId(request, response) {
    try {
      const id = request.userId;
      const user = await _User2.default.findByPk(id);
      const { nome, email } = user;
      return response.json({ nome, email });
    } catch (error) {
      return response.json('erro');
    }
  }

  async atualizUser(request, response) {
    const id = request.userId;
    const { nome } = request.body;
    const user = await _User2.default.findByPk(id);
    _User2.default.update(user, nome);
    return response.json(user);
  }

  async deleteUser(request, response) {
    const id = request.userId;
    const user = await _User2.default.findByPk(id);
    await user.destroy();

    return response.json('Usuario deletado com sucesso');
  }
}

exports. default = new Users();
