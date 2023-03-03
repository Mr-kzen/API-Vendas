import { IHashProvider } from './../providers/hashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { ICreateUser } from '../domain/models/ICreateUser'
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../typeorm/repositories/UsersRepository';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersReaository')
    private userRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const emailExist = await this.userRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    //bcripty
    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
