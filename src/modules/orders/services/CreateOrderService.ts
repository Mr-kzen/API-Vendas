import { ProductRepository } from './../../products/typeorm/repositories/ProductsRepository';
import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Order from '../typeorm/entities/Order';
import CustomersRespository from '@modules/customers/typeorm/repositories/CustomersRepository';

interface IProducts {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProducts;
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRespository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id); //repositorio de clientes, verificando se existe
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id!'); //existe um produto com este mesmo nome
    }

    const existProducts = await productsRepository.findAllByIds(products);
    if (!existProducts.length) {
      throw new AppError('Could not find any products with the give ids!');
    }

    //os ids que foram enviados porem não existem na aplicação serão alocados aqui!
    const existsProductsIds = existProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id);
    ); 
    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find products ${checkInexistentProducts[0].id}.`);
    }

    //Verificando a quantidade em estoque, caso a quantidade comprada for maior! Cancelar compra!
    const quantityAvailable = products.filter(
      product => existProducts.filter(
        p => p.id === product.id
      )[0].quantity < product.quantity,
    );
    if (quantityAvailable.length) {
      throw new AppError(`The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`);
    }

    //retorna um arrai com a lista de produtos já montada
    const serializedProducts = products.map(
      product => ({
        product_id: product.id,
        quantity: product.quantity,
        price: existProducts.filter( p => p.id === product.id)[0].price,
      })
    )

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    })

    const {order_products} = order

    const updateProductQuantity = order_products.map(
      product => ({
        id: product.product_id,
        quantity: existProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity, //quantidade existente no estoque
      })
    )

    await productsRepository.save(updateProductQuantity);

    return order
    
  }
}

export default CreateOrderService;
