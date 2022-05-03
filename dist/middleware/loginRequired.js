"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

exports. default = async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      errors: ['Login required'],
    });
  }
  const [, token] = authorization.split(' ');
  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await _User2.default.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      return response.status(401).json({
        errors: ['Usuario invalido'],
      });
    }
    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      errors: ['token expirado ou invalida'],
    });
  }
};
