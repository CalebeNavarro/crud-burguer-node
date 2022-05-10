import { getRepository } from "typeorm";
import Product from "../../models/Product";


interface Request {
  name: string;
  price: number;
  description: string;
}

export default class CreateProductService {
  public async execute({ price, description, name }: Request): Promise<Product> {
    const productRepository = getRepository(Product);

    const product = productRepository.create({
      name,
      price,
      description,
    });

    await productRepository.save(product);
    console.log(product)
    return product;
  }
}