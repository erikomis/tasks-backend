import { Op } from 'sequelize';
import ErrorsApp from '../../../erros/ErrorsApp';
import Task from '../models/Task';

export class TaskRepository extends Task {
  async findById(id) {
    try {
      const task = await Task.findByPk(id);
      return task;
    } catch (error) {
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }

  async findByName(user_id, name) {
    try {
      const task = await Task.findAll({
        order: ['nome'],
        where: {
          user_id: user_id,
          nome: { [Op.like]: '%' + name + '%' },
        },
      });
      return task;
    } catch (error) {
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }

  async createTask(user_id, originalname, filename, nome, descricao) {
    try {
      const task = await Task.create({
        user_id,
        originalname,
        filename,
        nome,
        descricao,
      });
      return task;
    } catch (error) {
      console.log(error.errors.map((err) => err.message));
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }

  async paginationTask(user_id, page, limit) {
    const tasks = await Task.findAndCountAll({
      order: [['id', 'DESC']],
      where: { user_id: user_id },
      offset: (page - 1) * limit,
      limit,
    });
    return tasks;
  }

  async updateTask(id, user_id, nome, descricao) {
    try {
      const task = await Task.findByPk(id);
      await task.update({
        user_id,
        nome,
        descricao,
      });
      return task;
    } catch (error) {
      throw new ErrorsApp(
        error.errors.map((err) => err.message),
        401,
      );
    }
  }

  async updateTaskImagem(id, user_id, originalname, filename, nome, descricao) {
    const task = await Task.findByPk(id);

    await task.update({
      user_id,
      originalname,
      filename,
      nome,
      descricao,
    });
    return task;
  }
  async deleteTaskByid(id) {
    const task = await Task.findByPk(id);
    task.destroy();
  }
}
