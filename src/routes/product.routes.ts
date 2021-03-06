import { Router } from "express";
import { getRepository } from "typeorm";
import ensureAuth from "../middlewares/ensureAuth";
import Product from "../models/Product";

import CreateProductService from "../services/Products/CreateProductsService";
import DeleteProductService from "../services/Products/DeleteProductsService";
import UpdateProductService from "../services/Products/UpdateProductService";

import * as yup from "yup";
import AppError from "../errors/AppError";


const productRouter = Router();

productRouter.get("/", async(request, response) => {
  const productRepository = getRepository(Product);

  const products = await productRepository.find();

  return response.json(products);
});

productRouter.use(ensureAuth);

productRouter.post("/", async(request, response) => {
  const schema = yup.object().shape({
    description: yup.string().required("description is required"),
    name: yup.string().required(),
    price: yup.number().required()
  });

  await schema.validate(request.body, { abortEarly: false}).catch(({ errors }) => {
    throw new AppError(errors);
  });
  
  const { description, name, price } = request.body;

  const createProduct = new CreateProductService();

  const product = await createProduct.execute({
    description,
    name,
    price
  })
  console.log(createProduct)

  return response.json(product);
});

productRouter.patch("/:product_id", async(request, response) => {
  const { product_id } = request.params;
  const { description, name, price } = request.body;

  const updateProduct = new UpdateProductService();

  const product = await updateProduct.execute({
    id: product_id,
    description,
    name,
    price
  });

  return response.json(product);
});

productRouter.delete("/:product_id", async(request, response) => {
  const { product_id } = request.params;
  const deleteProduct = new DeleteProductService();

  await deleteProduct.execute({
    id: product_id
  }) 

  return response.status(204).json();
});

export default productRouter;