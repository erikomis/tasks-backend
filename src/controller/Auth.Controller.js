import { authService } from '../services/index';

export class AuthController {
  async login(request, response) {
    const { email = '', password = '' } = request.body;
    let user = await authService.login(email, password);
    return response.status(200).json(user);
  }
  async register(request, response) {
    let createUser = await authService.register(request.body);
    return response.status(200).json(createUser);
  }
}
