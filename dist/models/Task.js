"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class Task extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        descricao: {
          type: _sequelize2.default.TEXT,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse campo',
            },
          },
        },
        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse  campo',
            },
          },
        },
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse campo',
            },
          },
        },
        url: {
          type: _sequelize2.default.VIRTUAL,
          get() {
            return ` ${_appConfig2.default.url}/${this.getDataValue('filename')}`;
          },
        },
      },
      { sequelize },
    );
    return this;
  }
} exports.default = Task;
