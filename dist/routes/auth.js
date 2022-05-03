"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Auth = require('../services/Auth'); var _Auth2 = _interopRequireDefault(_Auth);
var _express = require('express');

const routerAuth = new (0, _express.Router)();

routerAuth.post('/login/', _Auth2.default.login);
routerAuth.post('/register/', _Auth2.default.register);

exports. default = routerAuth;
