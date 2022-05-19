import ErrorsApp from '../erros/ErrorsApp';

import { valida } from '../util/validacoes';
import { taskRepository } from '../infra/sequelize/repositories/index';

export class TasksService {
  async createTask(user_id, nome, descricao, originalname, filename) {
    if (!user_id) {
      throw new ErrorsApp('User nao existe', 401);
    }
    const listField = { nome, descricao };
    console.log(user_id, nome, descricao, originalname, filename);
    const verificacao = valida(listField);
    console.log('valida');
    if (verificacao) {
      throw new ErrorsApp(`Campo em branco ${verificacao}`, 401);
    }
    console.log('tese');
    const task = await taskRepository.createTask(
      user_id,
      originalname,
      filename,
      nome,
      descricao,
    );
    return task;
  }

  async findAllTasks(user_id, page, limit) {
    if (!user_id) {
      throw new ErrorsApp('User nao existe', 401);
    }
    const tasks = taskRepository.paginationTask(user_id, page, limit);
    return tasks;
  }

  async taskFindById(id) {
    if (!id) {
      throw new ErrorsApp('Task nao existe', 401);
    }
    const task = await taskRepository.findById(id);
    if (!task) throw new ErrorsApp('task  not exist', 400);
    return task;
  }

  async updateTaskById(user_id, nome, descricao, id) {
    if (!id) {
      throw new ErrorsApp('Task nao existe', 401);
    }
    if (!user_id) {
      throw new ErrorsApp('User nao existe', 401);
    }
    const listField = { nome, descricao };
    const verificacao = valida(listField);
    if (verificacao) {
      throw new ErrorsApp(
        `Campo em branco ${verificacao}`,
        401,
      );
    }
    const task = await taskRepository.updateTask(id, user_id, nome, descricao);

    return task;
  }

  async updateTaskByIdImagem(
    id,
    user_id,
    nome,
    descricao,
    originalname,
    filename,
  ) {
    if (!id) {
      throw new ErrorsApp('Task nao existe', 401);
    }
    if (!user_id) {
      throw new ErrorsApp('User nao existe', 401);
    }
    const listField = { nome, descricao };
    const verificacao = valida(listField);
    if (verificacao) {
      throw new ErrorsApp(`Campo em branco  ${verificacao}`, 401);
    }
    const task = await taskRepository.updateTaskImagem(
      id,
      user_id,
      originalname,
      filename,
      nome,
      descricao,
    );

    return task;
  }

  async deleteTaskById(id, user_id) {
    if (!id) {
      throw new ErrorsApp('Task nao existe', 401);
    }
    if (!user_id) {
      throw new ErrorsApp('User nao existe', 401);
    }
    taskRepository.deleteTaskByid(id);
  }

  async findByName(user_id, search) {
    const task = await taskRepository.findByName(user_id, search);
    if (!task) {
      throw new ErrorsApp('nada corresponte sua busca', 401);
    }
    return task;
  }
}
