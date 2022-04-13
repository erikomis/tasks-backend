import multer from 'multer';
import { Op } from 'sequelize';
import multerConfig from '../config/multerConfig';
import Task from '../models/Task';
import { valida } from '../util/validacoes';

const upload = multer(multerConfig).single('foto');
class Tasks {
  async criarTask(request, response) {
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
        if (!user_id) {
          return response.status(401).json({ Errors: ['User nao existe'] });
        }
        const listField = { nome, descricao };
        const verificacao = valida(listField);
        if (verificacao) {
          return response.status(400).json({
            Errors: {
              message: 'Campo em branco',
              verificacao,
            },
          });
        }

        const task = await Task.create({
          user_id,
          originalname,
          filename,
          nome,
          descricao,
        });
        return response.json(task);
      } catch (error) {
        console.log(error);
        return response.status(400).json({
          errors: ['User não existe'],
        });
      }
    });
  }
  async verTodasAsTasks(request, response) {
    try {
      const { page, limit } = request.query;
      console.log(request.query);
      const user_id = request.userId;
      if (!user_id) {
        return response.status(401).json({ Errors: ['User nao existe'] });
      }
      const tasks = await Task.findAndCountAll({
        order: [['id', 'DESC']],
        where: { user_id: user_id },
        offset: page * limit,
        limit,
      });
      return response.json(tasks);
    } catch (error) {
      return response.status(401).json('Usuario invalido');
    }
  }
  async taskById(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(401).json({ Errors: ['Task nao existe'] });
      }
      const task = await Task.findByPk(id);
      return response.json(task);
    } catch (error) {
      return response.status(400).json({
        errors: ['User não existe'],
      });
    }
  }
  async atualizarTaskById(request, response) {
    if (request.headers['content-type'] === 'application/json') {
      try {
        const user_id = request.userId;
        const { nome, descricao } = request.body;
        const { id } = request.params;
        if (!id) {
          return response.status(401).json({ Errors: ['Task nao existe'] });
        }
        if (!user_id) {
          return response.status(401).json({ Errors: ['User nao existe'] });
        }
        const listField = { nome, descricao };
        const verificacao = valida(listField);
        if (verificacao) {
          return response.status(400).json({
            Errors: {
              message: 'Campo em branco',
              verificacao,
            },
          });
        }
        const task = await Task.findByPk(id);
        await task.update({
          user_id,
          nome,
          descricao,
        });
        return response.json(task);
      } catch (error) {
        console.log(error);
        return response.status(400).json({
          errors: ['User não existe'],
        });
      }
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
          if (!id) {
            return response.status(401).json({ Errors: ['Task nao existe'] });
          }
          if (!user_id) {
            return response.status(401).json({ Errors: ['User nao existe'] });
          }
          const listField = { nome, descricao };
          const verificacao = valida(listField);
          if (verificacao) {
            return response.status(400).json({
              Errors: {
                message: 'Campo em branco',
                verificacao,
              },
            });
          }
          const task = await Task.findByPk(id);

          await task.update({
            user_id,
            originalname,
            filename,
            nome,
            descricao,
          });
          return response.json(task);
        } catch (error) {
          console.log(error);
          return response.status(400).json({
            errors: ['User não existe'],
          });
        }
      });
    }
  }
  async deleteTaskByid(request, response) {
    try {
      const { id } = request.params;
      const user_id = request.userId;

      if (!id) {
        return response.status(401).json({ Errors: ['Task nao existe'] });
      }
      if (!user_id) {
        return response.status(401).json({ Errors: ['User nao existe'] });
      }
      const task = await Task.findByPk(id);
      await task.destroy();
      return response.status(200).json([]);
    } catch (error) {
      return response.status(400).json({
        errors: ['User não existe'],
      });
    }
  }

  async buscaPorNome(request, response) {
    try {
      const user_id = request.userId;
      const { search } = request.body;
      const task = await Task.findAll({
        order: ['nome'],
        where: {
          user_id: user_id,
          nome: { [Op.like]: '%' + search + '%' },
        },
      });
      console.log(task);
      if (!task) {
        return response
          .status(401)
          .json({ Errors: ['nada corresponte sua busca'] });
      }

      return response.json(task);
    } catch (error) {
      return response.status(400).json({
        errors: ['nada corresponte sua busca'],
      });
    }
  }
}
export default new Tasks();
