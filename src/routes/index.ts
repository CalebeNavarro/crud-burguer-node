import { Router } from "express";
import sessionRouter from "./session.routes";
import userRouter from "./user.routes";

const routes = Router();


routes.use("/sessions", sessionRouter);
routes.use("/users", userRouter);

export default routes;