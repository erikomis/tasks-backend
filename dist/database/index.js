"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Task = require('../models/Task'); var _Task2 = _interopRequireDefault(_Task);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

const models = [_User2.default, _Task2.default];
const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
