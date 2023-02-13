import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import UsersRespository from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import { hash } from 'bcryptjs';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRespository);

    const emailExist = await usersRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    //bcripty
    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
