import { Response, Request } from 'express';
import resetPasswordService from '../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = new resetPasswordService();

    await resetPassword.execute({
      password,
      token,
    });

    return response.status(204).json('');
  }
}
