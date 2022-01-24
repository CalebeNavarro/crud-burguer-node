import { Router } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repositories/UserRepository";
import CreateUserService from "../services/User/CreateUserService";
import { classToClass } from "class-transformer";

const userRouter = Router();

userRouter.post("/", async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    email,
    name,
    password
  })

  return response.status(201).json(user);
});

userRouter.get("/", async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);

  const users = await userRepository.find();

  return response.json(classToClass(users));
})

export default userRouter;