import { getRepository } from "typeorm";
import AppError from "../../errors/AppError";

import Order from "../../models/Order";
import OrderProduct from "../../models/OrderProduct";
import Product from "../../models/Product";


interface Request {
  desk: string;
  products_ids: string[];
}


export default class CreateOrderService {
  public async execute({ desk, products_ids}: Request):Promise<Order | undefined> {
    const orderRepository = getRepository(Order);
    const orderProductRepository = getRepository(OrderProduct);
    const productsRepository = getRepository(Product);

    try {
      products_ids.forEach(async product_id => {
        const product = await productsRepository.findOne({
          where: {
            id: product_id
          }
        });
  
        if (!product) {
          throw new Error("Invalid list of products ids");
        }
      })
    } catch (err) {
      throw new AppError("Invalid list of products ids");
    }

    const order = orderRepository.create({
      desk,
    });

    await orderRepository.save(order);

    products_ids.forEach(async product_id => {
      const orderProduct = orderProductRepository.create({
        order: {
          id: order.id,
        },
        product: {
          id: product_id
        }
      });
      await orderProductRepository.save(orderProduct);
    });
    return order;
  }
}