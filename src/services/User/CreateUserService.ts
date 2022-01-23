import { getCustomRepository } from "typeorm";
import UserRepository from "../../repositories/UserRepository";
import User from "../../models/User";
import { hash } from "bcryptjs"
import AppError from "../../errors/AppError";

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ email, password, name }: Request): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const checkUserExist = await userRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError("Email already exist", 401);
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await userRepository.save(user);

    return user;
  }
}