import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRespository extends Repository<User> {
  public async findByName(name: string): Promise<User | null> {
    const user = await this.findOne({
      where: { name },
    });

    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRespository;
