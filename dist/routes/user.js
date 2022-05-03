"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middleware/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _Users = require('../services/Users'); var _Users2 = _interopRequireDefault(_Users);

const routerUser = new (0, _express.Router)();
routerUser.get('/', _loginRequired2.default, _Users2.default.userPorId);
routerUser.put('/', _loginRequired2.default, _Users2.default.atualizUser);
routerUser.delete('/', _loginRequired2.default, _Users2.default.deleteUser);

exports. default = routerUser;
