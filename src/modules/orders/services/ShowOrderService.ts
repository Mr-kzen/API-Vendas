import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id); //repositorio de clientes, verificando se existe
    if (!order) {
      throw new AppError('Order not found!'); //existe um produto com este mesmo nome
    }

    return order;
  }
}

export default ShowOrderService;
