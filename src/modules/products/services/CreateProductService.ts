import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const productExist = await productsRepository.fyndByName(name);

    if (productExist) {
      throw new AppError('There is already one product with this name!'); //existe um produto com este mesmo nome
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await product;

    return product;
  }
}

export default CreateProductService;
