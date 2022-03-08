import Sequelize, { Model } from 'sequelize';
import brcryptjs from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 255],
              msg: 'Campo nome deve ter  entre 3 e 255  caracteres',
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email ja existe',
          },
          validate: {
            isEmail: {
              msg: 'Email inválido',
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [4, 50],
              msg: 'senha precisa ter entre 4 e 50 caracteres',
            },
          },
        },
      },
      { sequelize },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await brcryptjs.hash(user.password, 8);
      }
    });
    return this;
  }

  passwordIsValid(password) {
    return brcryptjs.compare(password, this.password_hash);
  }
}
