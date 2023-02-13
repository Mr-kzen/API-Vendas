import { getCustomRepository } from 'typeorm';
import { ProductRepository } from './../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[] | undefined> {
    const productsRepository = getCustomRepository(ProductRepository); //acessando o repositorio customizado

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
