import multer from 'multer';
import multerConfig from '../config/multerConfig';
import { tasksService } from '../services/index';

const upload = multer(multerConfig).single('foto');

export class TasksController {
  async createTask(request, response) {
    return upload(request, response, async (error) => {
      if (error) {
        return response.status(400).json({
          errors: [error.code],
        });
      }
      try {
        const user_id = request.userId;
        const { nome, descricao } = request.body;
        const { originalname, filename } = request.file;
        const task = await tasksService.createTask(
          user_id,
          nome,
          descricao,
          originalname,
          filename,
        );
        return response.status(201).json(task);
      } catch (error) {
        return response.status(401).json(error);
      }
    });
  }

  async updateTask(request, response) {
    if (request.headers['content-type'] === 'application/json') {
      const user_id = request.userId;
      const { nome, descricao } = request.body;
      const { id } = request.params;

      const updateTask = await tasksService.updateTaskById(
        user_id,
        nome,
        descricao,
        id,
      );
      return response.status(200).json(updateTask);
    } else {
      return upload(request, response, async (error) => {
        if (error) {
          return response.status(400).json({
            errors: [error.code],
          });
        }
        try {
          const { originalname, filename } = request.file;
          const user_id = request.userId;
          const { nome, descricao } = request.body;
          const { id } = request.params;
          const task = await tasksService.updateTaskByIdImagem(
            id,
            user_id,
            nome,
            descricao,
            originalname,
            filename,
          );
          console.log(task);
          return response.status(200).json(task);
        } catch (error) {
          return response.status(401).json(error);
        }
      });
    }
  }

  async findAllTasks(request, response) {
    const { page, limit } = request.query;
    const user_id = request.userId;
    const tasks = await tasksService.findAllTasks(user_id, page, limit);

    return response.status(200).json(tasks);
  }
  async findTaskById(request, response) {
    const { id } = request.params;
    const task = await tasksService.taskFindById(id);

    return response.json(task);
  }
  async findByNome(request, response) {
    const user_id = request.userId;
    const { search } = request.body;

    const tasks = await tasksService.findByName(user_id, search);

    return response.status(200).json(tasks);
  }

  async deleteTask(request, response) {
    const { id } = request.params;
    const user_id = request.userId;
    await tasksService.deleteTaskById(id, user_id);

    return response.status(200).json([]);
  }
}
