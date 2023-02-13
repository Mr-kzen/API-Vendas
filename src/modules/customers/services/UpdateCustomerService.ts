import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customers from '../typeorm/entities/Customer';
import CustomersRespository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRespository); //instancia do repositorio

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not fond.');
    }

    const customerExist = await customerRepository.findByEmail(email); //verificação de email, o mesmo não pode alterar email que não é dele

    if (!customerExist && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
