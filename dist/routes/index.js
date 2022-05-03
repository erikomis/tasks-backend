"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _auth = require('./auth'); var _auth2 = _interopRequireDefault(_auth);
var _task = require('./task'); var _task2 = _interopRequireDefault(_task);
var _user = require('./user'); var _user2 = _interopRequireDefault(_user);

const routerIndex = _express.Router.call(void 0, );

routerIndex.use('/auth', _auth2.default);
routerIndex.use('/users', _user2.default);
routerIndex.use('/tasks', _task2.default);

exports. default = routerIndex;
