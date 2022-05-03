"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _loginRequired = require('../middleware/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);
var _Tasks = require('../services/Tasks'); var _Tasks2 = _interopRequireDefault(_Tasks);

const routerTask = new (0, _express.Router)();

routerTask.post('/', _loginRequired2.default, _Tasks2.default.criarTask);
routerTask.get('/', _loginRequired2.default, _Tasks2.default.verTodasAsTasks);
routerTask.get('/:id', _loginRequired2.default, _Tasks2.default.taskById);

routerTask.put('/:id', _loginRequired2.default, _Tasks2.default.atualizarTaskById);
routerTask.delete('/:id', _loginRequired2.default, _Tasks2.default.deleteTaskByid);
routerTask.post('/search', _loginRequired2.default, _Tasks2.default.buscaPorNome);

exports. default = routerTask;
