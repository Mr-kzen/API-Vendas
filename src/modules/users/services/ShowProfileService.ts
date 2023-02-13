import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UsersRespository from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRespository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not fond.');
    }

    return user;
  }
}

export default ShowProfileService;
