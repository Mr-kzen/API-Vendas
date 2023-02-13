import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UsersRespository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class CreateUserService {
  public async execute({
    user_id,
    avatarFilename,
  }: IRequest): Promise<User | undefined> {
    const usersRepository = getCustomRepository(UsersRespository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); //removendo arquivo caso ele exista para que não tenha 2 avatar
      }

      user.avatar = avatarFilename;

      await usersRepository.save(user);

      return user;
    }
  }
}

export default CreateUserService;
