import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UsersRespository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
// import path from 'path';
// import uploadConfig from '@config/upload';
// import fs from 'fs';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';
import uploadConfig from '@config/upload';
import S3StorageProvider from '@shared/providers/storageProvider/S3DiskStorageProvider';

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

    if (uploadConfig.driver === 's3') {
      const storageProvider = new S3StorageProvider();

      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);
    } else {
      const storageProvider = new DiskStorageProvider();
      if (user.avatar) {
        await storageProvider.deleteFile(user.avatar);
      }

      const fileName = await storageProvider.saveFile(avatarFilename);

      user.avatar = fileName;
    }

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
