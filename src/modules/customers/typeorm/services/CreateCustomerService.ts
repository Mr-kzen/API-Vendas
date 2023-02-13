import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customers from '../entities/Customer';
import CustomersRespository from '../repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRespository);

    const emailExist = await customerRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
    }

    const customer = customerRepository.create({
      name,
      email,
    });

    await customerRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
