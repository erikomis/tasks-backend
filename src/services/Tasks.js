import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Task from '../models/Task';

const upload = multer(multerConfig).single('foto_task');

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
        const { nome, descricao, user_id } = request.body;

        const task = await Task.create({
          user_id,
          originalname,
          filename,
          nome,
          descricao,
        });

        if (
          user_id === null ||
          originalname === null ||
          filename === null ||
          nome === null ||
          descricao === null
        ) {
          return response.status(401).json({ Errors: ['Campo em branco'] });
        }

        if (!user_id) {
          return response.status(401).json({ Errors: ['User nao existe'] });
        }
        return response.json(task);
      } catch (error) {
        console.log(error);
        return response.status(400).json({
          errors: ['User não existe'],
        });
      }
    });
  }
  verTodasAsTasks() {}
}
export default new Tasks();
