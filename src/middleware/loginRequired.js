import jwt from 'jsonwebtoken';
import User from '../infra/sequelize/models/User';

export default async (request, response, next) => {
  const { authorization } = request.headers;
  if (!authorization) {
    return response.status(401).json({
      errors: ['Login required'],
    });
  }
  const [, token] = authorization.split(' ');
  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;
    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });
    if (!user) {
      return response.status(401).json({
        errors: ['Usuario invalido'],
      });
    }
    request.userId = id;
    request.userEmail = email;
    return next();
  } catch (error) {
    console.log(error);
    return response.status(401).json({
      errors: ['token expirado ou invalida'],
    });
  }
};
