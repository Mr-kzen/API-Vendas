import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customer';
import CustomersRespository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customers[]> {
    const customerRepository = getCustomRepository(CustomersRespository);

    const users = customerRepository.find();

    return users;
  }
}

export default ListCustomerService;
