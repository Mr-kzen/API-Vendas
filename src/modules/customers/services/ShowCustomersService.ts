import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customers from '../typeorm/entities/Customer';
import CustomersRespository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customers> {
    const customersRepository = getCustomRepository(CustomersRespository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not fond.');
    }

    return customer;
  }
}

export default ShowCustomerService;
