import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileController {
  public async showProfile(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const ShowProfile = new ShowProfileService();
    const user_id = request.user.id;

    const users = await ShowProfile.execute({ user_id });

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body;

    const user_id = request.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
