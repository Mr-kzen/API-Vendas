import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UsersRespository from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRespository); //instancia do repositorio

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not fond.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email); //verificação de email, o mesmo não pode alterar email que não é dele

    if (!userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required!');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match!');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
