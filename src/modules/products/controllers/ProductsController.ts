import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService';
import UpdateProductService from '../services/UpdateProdutService';
import DeleteProductService from '../services/DeleteProductService';

export default class ProductsController {
  public async index(req, res): Promise<Response> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.json(products);
  }

  public async show(req, res): Promise<Response> {
    const { id } = req.params;

    const showProducts = new ShowProductService();

    const product = await showProducts.execute({ id });

    return res.json(product);
  }

  public async create(req, res): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return res.json(product);
  }

  public async update(req, res): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.json(product);
  }

  public async delete(req, res): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
