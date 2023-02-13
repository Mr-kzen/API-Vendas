import User from '../typeorm/entities/User';
import { getCustomRepository } from 'typeorm';
import UsersRespository from '../typeorm/repositories/UsersRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRespository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
