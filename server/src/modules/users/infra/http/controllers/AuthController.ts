import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

import IRegisterUserDTO from '@modules/users/dtos/IRegisterUserDTO';
import IAuthenticateUserDTO from '@modules/users/dtos/IAuthenticateUserDTO';
import RegisterUserService from '@modules/users/services/RegisterUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

class AuthController {
  public async register(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { name, email, password }: IRegisterUserDTO = request.body;

    const registerUser = container.resolve(RegisterUserService);

    const user = await registerUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password }: IAuthenticateUserDTO = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default AuthController;
