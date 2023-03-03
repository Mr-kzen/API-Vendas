import AppError from '@shared/errors/AppError';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRespository from '../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRespository;
let createCustomer: CreateCustomerService;

describe('CreateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRespository();

    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Jorge Aluizio',
      email: 'jorge@gmail.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should be able to create two customer with the same email', async () => {
    await createCustomer.execute({
      name: 'Jorge Aluizio',
      email: 'jorge@gmail.com',
    });

    expect(
      createCustomer.execute({
        name: 'Jorge Aluizio',
        email: 'jorge@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
