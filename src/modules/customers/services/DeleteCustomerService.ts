import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRespository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class DeleteCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRespository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not fond.');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
