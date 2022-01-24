import { Router } from "express";
import AuthService from "../services/Session/AuthService";
import { classToClass } from "class-transformer";

const sessionRouter = Router();

sessionRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const authUser = new AuthService();

  const userResponse = await authUser.execute({
    email, password
  });

  // delete userResponse.user.password;

  return response.status(200).json(classToClass(userResponse));
})

export default sessionRouter;