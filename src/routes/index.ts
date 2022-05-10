import { Router } from "express";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";
import productRouter from "./product.routes"
import orderRouter from "./order.routes";

const routes = Router();


routes.use("/sessions", sessionRouter);
routes.use("/users", userRouter);
routes.use("/products", productRouter);
routes.use("/orders", orderRouter); 

export default routes;