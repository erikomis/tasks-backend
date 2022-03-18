import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Task from '../models/Task';
import User from '../models/User';

const models = [User, Task];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
