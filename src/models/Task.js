import Sequelize, { Model } from 'sequelize';
import appConfig from '../config/appConfig';

export default class Task extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter entre 3 e 255 caracteres',
            },
          },
        },
        descricao: {
          type: Sequelize.TEXT,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse campo',
            },
          },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse  campo',
            },
          },
        },
        originalname: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            notEmpty: {
              msg: 'Não pode ficar em branco esse campo',
            },
          },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return ` ${appConfig.url}/${this.getDataValue('filename')}`;
          },
        },
      },
      { sequelize },
    );
    return this;
  }
}
