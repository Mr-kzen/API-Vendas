import Customer from '../entities/Customer';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Customer)
class CustomersRespository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: { name },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRespository;
