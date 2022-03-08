import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

const models = [];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
